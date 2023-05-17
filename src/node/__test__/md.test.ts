import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkPehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { rehypePluginPreWrapper } from '../plugin-mdx/rehypePlugins/preWrapper';
import { rehypePluginShiki } from '../plugin-mdx/rehypePlugins/shiki';
import { describe, expect, test } from 'vitest';
import shiki from 'shiki';

describe('Markddown compile cases', async () => {
  const processor = unified();
  processor
    .use(remarkParse)
    .use(remarkPehype)
    .use(rehypePluginPreWrapper)
    .use(rehypePluginShiki, {
      highlighter: await shiki.getHighlighter({
        theme: 'nord'
      })
    })
    .use(rehypeStringify);
  test('markdown', async () => {
    const mdContent = '# 123';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot('"<h1>123</h1>"');
  });
  test('markdown', async () => {
    const mdContent = '```mermaid graph TB; 1--->2```';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(
      '"<p><code>mermaid graph TB; 1--->2</code></p>"'
    );
  });
  test('markdown code block', async () => {
    const mdContent = '```js\nconsole.log("test")\n```';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(`
      "<div class=\\"language-js\\"><span class=\\"lang\\">js</span><pre class=\\"shiki nord\\" style=\\"background-color: #2e3440ff\\" tabindex=\\"0\\"><code><span class=\\"line\\"><span style=\\"color: #D8DEE9\\">console</span><span style=\\"color: #ECEFF4\\">.</span><span style=\\"color: #88C0D0\\">log</span><span style=\\"color: #D8DEE9FF\\">(</span><span style=\\"color: #ECEFF4\\">\\"</span><span style=\\"color: #A3BE8C\\">test</span><span style=\\"color: #ECEFF4\\">\\"</span><span style=\\"color: #D8DEE9FF\\">)</span></span>
      <span class=\\"line\\"></span></code></pre></div>"
    `);
  });
});
