import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkPehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { rehypePluginPreWrapper } from '../plugin-mdx/rehypePlugins/preWrapper';
import { describe, expect, test } from 'vitest';
import { rehypePluginReplaceImagePath } from '../plugin-mdx/rehypePlugins/replaceImagePath';

describe('Markddown compile cases', async () => {
  const processor = unified();
  processor
    .use(remarkParse)
    .use(remarkPehype)
    .use(rehypePluginPreWrapper)
    .use(rehypeStringify)
    .use(rehypePluginReplaceImagePath, {
      githubRepositories: 'step-build',
      evn: 'build'
    });
  test('src replace', async () => {
    const mdContent = '![img](/image.png)';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(
      '"<p><img src=\\"/step-build/image.png\\" alt=\\"img\\"></p>"'
    );
  });
});
