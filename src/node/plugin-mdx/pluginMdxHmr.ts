import { Plugin } from 'vite';
import assert from 'assert';
import { MD_REGEX } from 'node/constants';
export function pluginMdxHmr(): Plugin {
  let viteReactPlugin: Plugin;
  return {
    name: 'vite-plugin-mdx-hmr',
    apply: 'serve',
    configResolved(config) {
      viteReactPlugin = config.plugins.find(
        (plugin) => plugin.name === 'vite:react-babel'
      ) as Plugin;
    },
    async transform(code, id, opts) {
      if (MD_REGEX.test(id)) {
        assert(typeof viteReactPlugin.transform === 'function');
        const result = await viteReactPlugin.transform.call(
          this,
          code,
          id + '?.jsx',
          opts
        );
        const selfAcceptCode = 'import.meta.hot.accept();';
        if (
          result &&
          typeof result === 'object' &&
          !result.code?.includes(selfAcceptCode)
        ) {
          result.code += selfAcceptCode;
        }
        return result;
      }
    }
  };
}
