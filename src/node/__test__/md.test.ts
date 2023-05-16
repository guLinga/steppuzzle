import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkPehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { describe, expect, test } from 'vitest';

describe('Markddown compile cases', async () => {
  const processor = unified();
  processor.use(remarkParse).use(remarkPehype).use(rehypeStringify);
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
});
