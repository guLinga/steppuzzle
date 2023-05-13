import { build as viteBuild, InlineConfig } from "vite";
import type { RollupOutput } from "rollup";
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from "./constants";
import { join } from "path";
import * as fs from "fs-extra";

export async function bundle(root: string) {
  const resolveViteConfig = (isServer: boolean): InlineConfig => ({
    mode: "production",
    root,
    build: {
      ssr: isServer,
      outDir: isServer ? ".temp" : "build",
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm",
        },
      },
    },
  });

  console.log(`Building client + server bundles...`);

  try {
    // viteBuild 类似于 vite build 命令
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(resolveViteConfig(false)),
      // server build
      viteBuild(resolveViteConfig(true)),
    ]);
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (e) {
    console.log(e);
  }
}

export async function renderPage(
  render: () => string,
  root: string,
  clientBundle: RollupOutput
) {
  // debugger;
  // 找到 非 SSR 的打包文件
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry
  );
  console.log(`Rendering page in server side...`);
  // SSR 后的 html 代码
  const appHtml = render();
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
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script type="module" src="/${clientChunk?.fileName}"></script>
    </body>
  </html>`.trim();
  // 写入 build/index.html 中
  await fs.ensureDir(join(root, "build"));
  await fs.writeFile(join(root, "build/index.html"), html);
  await fs.remove(join(root, ".temp"));
}

export async function build(root: string = process.cwd()) {
  // 1. bundle - client 端 + server 端
  const [clientBundle] = await bundle(root);
  // 2. 引入 server-entry 模块
  const serverEntryPath = join(root, ".temp", "ssr-entry.js");
  const { render } = require(serverEntryPath);
  // 3. 服务端渲染，产出 HTML
  await renderPage(render, root, clientBundle);
}