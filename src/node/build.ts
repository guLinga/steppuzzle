import { build as viteBuild, InlineConfig } from 'vite';
import type { RollupOutput } from 'rollup';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import { join, dirname } from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import { pathToFileURL } from 'url';
import { SiteConfig } from '../shared/types';
import { createVitePlugins } from './vitePlugins';
import { Route } from './plugin-routes';

export async function bundle(
  root: string,
  config: SiteConfig,
  buildPath: string
) {
  const resolveViteConfig = async (
    isServer: boolean,
    evn: 'build' | 'serve'
  ): Promise<InlineConfig> => ({
    mode: 'production',
    root,
    plugins: await createVitePlugins(config, evn, undefined, isServer),
    ssr: {
      noExternal: ['react-router-dom', 'lodash-es'] // 将 react-router-dom 打包进 chunk 中，这样避免打包后引入错误
    },
    build: {
      ssr: isServer,
      outDir: isServer ? join(root, '.temp') : join(root, 'build', buildPath),
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? 'cjs' : 'esm'
        }
      }
    }
  });

  const spinner = ora();
  spinner.start('Building client + server bundles...');

  try {
    // viteBuild 类似于 vite build 命令
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(await resolveViteConfig(false, 'build')),
      // server build
      viteBuild(await resolveViteConfig(true, 'build'))
    ]);
    spinner.stop();
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (e) {
    console.log(e);
    spinner.stop();
  }
}

export async function renderPage(
  render: (pagePath: string) => string,
  root: string,
  clientBundle: RollupOutput,
  routes: Route[],
  buildPath: string
) {
  // 找到 非 SSR 的打包文件
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
  const cilentChunkCss = clientBundle.output.find(
    (chunk) => chunk.type === 'asset'
  );
  console.log('Rendering page in server side...');
  // 多路由打包
  buildPath = buildPath ? '/' + buildPath : buildPath;
  const test = buildPath;
  return Promise.all(
    routes.map(async (route) => {
      const routePath = route.path;
      // SSR 后的 html 代码
      const appHtml = await render(routePath);
      // 将 SSR 生成的 html 拼接到 html 中，将 非 SSR 生成的 js 写入
      // 因为 SSR 生成的代码 并没有 js注入，所以需要一套代码 生成 客户端和服务端的代码
      const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>title</title>
        <meta name="description" content="xxx">
        <link rel="stylesheet" href="${buildPath}/${cilentChunkCss?.fileName}">
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script type="module" src="${buildPath}/${clientChunk?.fileName}"></script>
      </body>
    </html>`.trim();
      // 生成文件的名称
      const fileName = routePath.endsWith('/')
        ? `${routePath}index.html`
        : `${routePath}.html`;

      // 写入 文件
      await fs.ensureDir(join(root, 'build', dirname(fileName)));
      await fs.writeFile(join(root, 'build', fileName), html);
    })
  );
  // await fs.remove(join(root, '.temp'));
}

export async function build(root: string = process.cwd(), config: SiteConfig) {
  const buildPath = config.siteData.other.githubRepositories || '';
  // 1. bundle - client 端 + server 端
  const [clientBundle] = await bundle(root, config, buildPath);
  // 2. 引入 server-entry 模块
  const serverEntryPath = join(root, '.temp', 'ssr-entry.js');
  const { render, routes } = await import(
    pathToFileURL(serverEntryPath).toString()
  );
  // 3. 服务端渲染，产出 HTML
  await renderPage(render, root, clientBundle, routes, buildPath);
}
