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
const file1Json = 'file1.json';
const file2Json = 'file2.json';
const file1Yml = 'file1.yml';
const file2Yml = 'file2.yml';

test('genDiffWorks', () => {
  expect(genDiff(file1Json, file2Json)).toBe(genDiff(file1Yml, file2Yml));
  expect(genDiff(file1Json, file2Json)).toBe(expected);
});
