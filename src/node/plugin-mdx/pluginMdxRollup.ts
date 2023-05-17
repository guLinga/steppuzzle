import { Plugin } from 'vite';
import pluginMdx from '@mdx-js/rollup';
import remarkGFM from 'remark-gfm';
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings';
import rehypePluginSlug from 'rehype-slug';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkFrontmatter from 'remark-frontmatter';
import { rehypePluginPreWrapper } from './rehypePlugins/preWrapper';
import { rehypePluginShiki } from './rehypePlugins/shiki';
import { remarkPluginToc } from './reMarkPlugins/toc';
import shiki from 'shiki';

export async function pluginMdxRollup(): Promise<Plugin> {
  return pluginMdx({
    remarkPlugins: [
      remarkGFM,
      [remarkMdxFrontmatter, { name: 'frontmatter' }],
      remarkFrontmatter,
      remarkPluginToc
    ],
    rehypePlugins: [
      rehypePluginSlug,
      [
        rehypePluginAutolinkHeadings,
        {
          properties: {
            class: 'header-anchor'
          },
          content: {
            type: 'text',
            value: '#'
          }
        }
      ],
      rehypePluginPreWrapper,
      [
        rehypePluginShiki,
        {
          highlighter: await shiki.getHighlighter({ theme: 'nord' })
        }
      ]
    ]
  });
}
