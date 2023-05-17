import { pluginMdxRollup } from './pluginMdxRollup';
import { Plugin } from 'vite';
import { pluginMdxHmr } from './pluginMdxHmr';

export async function PluginMdx(): Promise<Plugin[]> {
  return [await pluginMdxRollup(), pluginMdxHmr()];
}
