import { Plugin } from 'vite';
import { pluginIndexHtml } from './plugin-steppuzzle/indexHtml';
import pluginReact from '@vitejs/plugin-react'; // 保持组件状态
import { pluginConfig } from './plugin-steppuzzle/config';
import { pluginRoutes } from './plugin-routes';
import { PluginMdx } from './plugin-mdx';
import { SiteConfig } from '../shared/types/index';
import pluginUnocss from 'unocss/vite';
import unocssOptions from './unocssOptions';

export async function createVitePlugins(
  siteConfig: SiteConfig,
  restartServer?: () => Promise<void>,
  isSSR = false
) {
  return [
    pluginUnocss(unocssOptions),
    pluginIndexHtml(),
    pluginReact({
      jsxRuntime: 'automatic'
    }),
    pluginConfig(siteConfig, restartServer),
    pluginRoutes({
      siteConfig,
      root: siteConfig.root,
      isSSR
    }),
    await PluginMdx()
  ] as Plugin[];
}
