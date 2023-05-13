import { cac } from 'cac'

// 获取 package.json 中的版本号
const version = require('../../package.json').version;

const cli = cac("steppuzzle").version(version).help();

// 添加 dev 命令
cli
  .command("dev [root]", "start dev server")
  .action(async (root: string) => {
    console.log("dev", root);
  });

// 添加 build 命令
cli
  .command("build [root]", "build for production")
  .action(async (root: string) => {
    console.log("build", root);
  });

cli.parse();