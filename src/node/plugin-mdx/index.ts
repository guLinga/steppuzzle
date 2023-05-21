import { pluginMdxRollup } from './pluginMdxRollup';
import { Plugin } from 'vite';
import { pluginMdxHmr } from './pluginMdxHmr';

export async function PluginMdx(
  githubRepositories: string,
  evn: 'build' | 'serve'
): Promise<Plugin[]> {
  return [await pluginMdxRollup(githubRepositories, evn), pluginMdxHmr()];
}
