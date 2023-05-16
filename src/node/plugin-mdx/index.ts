import { pluginMdxRollup } from './pluginMdxRollup';

export function createPluginMdx() {
  return [pluginMdxRollup()];
}
