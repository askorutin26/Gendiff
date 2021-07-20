import { expect, test } from '@jest/globals';
import genDiff from '../src/showDiff.js';

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
const file1 = 'file1.json';
const file2 = 'file2.json';

test('genDiffWorks', () => {
  expect(genDiff(file1, file2)).toBe(expected);
});
