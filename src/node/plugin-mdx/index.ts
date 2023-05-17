import { pluginMdxRollup } from './pluginMdxRollup';
import { Plugin } from 'vite';

export async function PluginMdx(): Promise<Plugin[]> {
  return [await pluginMdxRollup()];
}
