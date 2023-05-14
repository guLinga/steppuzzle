import { expect, test } from 'vitest';

test('add', () => {
  expect(1 + 1).toBe(2);
  expect('map'.slice(1)).toMatchSnapshot('"ap"');
  expect('map'.slice(1)).toMatchInlineSnapshot('"ap"');
});
