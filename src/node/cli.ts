import { cac } from 'cac';
import { resolve } from 'path';
import { build } from './build';
import { resolveConfig } from './config';

// 获取 package.json 中的版本号
const version = (await import('../../package.json')).version;

const cli = cac('steppuzzle').version(version).help();

// 添加 dev 命令
cli.command('dev [root]', 'start dev server').action(async (root: string) => {
  // 启动 devserver
  const createServer = async () => {
    const { createDevServer } = await import('./dev');
    const server = await createDevServer(root, async () => {
      await server.close();
      await createServer();
    });
    // 监听 devserver
    await server.listen();
    // 输出信息
    server.printUrls();
  };
  await createServer();
});

// 添加 build 命令
cli
  .command('build [root]', 'build for production')
  .action(async (root: string) => {
    try {
      root = resolve(root);
      const config = await resolveConfig(root, 'build', 'production');
      // debugger;

      // SSG 生成的核心逻辑
      await build(root, config);
    } catch (e) {
      console.log(e);
    }
  });

cli.parse();
