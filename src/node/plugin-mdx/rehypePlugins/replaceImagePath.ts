import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import type { Root } from 'hast';

interface Options {
  githubRepositories: string;
  evn: 'build' | 'serve';
}

export const rehypePluginReplaceImagePath: Plugin<[Options], Root> = ({
  githubRepositories: github,
  evn
}) => {
  if (evn === 'serve') return;
  return (tree) => {
    visit(tree, 'element', (node) => {
      // 1. 找到 img 元素
      if (node.tagName === 'img') {
        github = github ? '/' + github : '';
        node.properties.src = github + node.properties.src;
      }
    });
  };
};
