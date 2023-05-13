import { join } from "path";

export const PACKAGE_ROOT = join(__dirname, "..", "..", "..");// 根目录
export const RUNTIME_PATH = join(PACKAGE_ROOT, "src", "runtime");// runtime 目录
export const CLIENT_ENTRY_PATH = join(RUNTIME_PATH, "client-entry.tsx");// client-entry.tsx 客户端入口文件
export const SERVER_ENTRY_PATH = join(RUNTIME_PATH, "ssr-entry.tsx");// ssr-entry.tsx 服务端入口文件
export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, "template.html");// html 模板