import { join } from "path";

export const PACKAGE_ROOT = join(__dirname, "..", "..", "..");// 根目录
export const CLIENT_ENTRY_PATH = join( // client-entry.tsx 客户端入口文件
  PACKAGE_ROOT,
  "src",
  "runtime",
  "client-entry.tsx"
);
export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, "template.html");// html 模板