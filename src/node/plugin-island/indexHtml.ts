import { readFile } from 'fs/promises';
import { Plugin } from 'vite';
import { CLIENT_ENTRY_PATH, DEFAULT_HTML_PATH } from '../constants';

export function pluginIndexHtml(): Plugin {
  return {
    name: 'steppuzzle:index-html',
    apply: 'serve',
    // transformIndexHtml vite的一个函数钩子 用于在构建过程中通过修改生成 HTML 页面的内容或添加额外的内容来向项目添加一些自定义的逻辑。
    // 插入入口 script 标签
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@fs/${CLIENT_ENTRY_PATH}` // createServer 入口
            },
            injectTo: 'body'
          }
        ]
      };
    },
    // configureServer 是 Vite 插件中的一个函数钩子，可以用来配置开发服务器。
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await readFile(DEFAULT_HTML_PATH, 'utf-8');

          try {
            // 热更新，但是更新后无法保持原本组件的状态，结合 vite 的 pluginReact 插件使用可实现组件状态持久
            html = await server.transformIndexHtml(
              req.url,
              html,
              req.originalUrl
            );
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    }
  };
}
