import { join } from 'path';

// 因为使用了 tsup 来进行 cli.ts 的编译， tsup 打包后的文件在 dist/tsup 目录下，所以要改变 PACKAGE_ROOT 的地址
export const PACKAGE_ROOT = join(__dirname, '..', '..');
// export const PACKAGE_ROOT = join(__dirname, "..", "..", "..");// 根目录
export const RUNTIME_PATH = join(PACKAGE_ROOT, 'src', 'runtime'); // runtime 目录
export const CLIENT_ENTRY_PATH = join(RUNTIME_PATH, 'client-entry.tsx'); // client-entry.tsx 客户端入口文件
export const SERVER_ENTRY_PATH = join(RUNTIME_PATH, 'ssr-entry.tsx'); // ssr-entry.tsx 服务端入口文件
export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, 'template.html'); // html 模板
export const MD_REGEX = /\.mdx?$/;
