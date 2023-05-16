import { pluginIndexHtml } from './plugin-steppuzzle/indexHtml';
import pluginReact from '@vitejs/plugin-react'; // 保持组件状态
import { pluginConfig } from './plugin-steppuzzle/config';
import { pluginRoutes } from './plugin-routes';
import { createPluginMdx } from './plugin-mdx';
import { SiteConfig } from '../shared/types/index';
import { Plugin } from 'vite';

export function createVitePlugins(
  siteConfig: SiteConfig,
  restartServer?: () => Promise<void>
) {
  return [
    pluginIndexHtml(),
    pluginReact({
      jsxRuntime: 'automatic'
    }),
    pluginConfig(siteConfig, restartServer),
    pluginRoutes({
      root: siteConfig.root
    }),
    createPluginMdx()
  ] as Plugin[];
}
