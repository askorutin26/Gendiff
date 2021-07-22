import { expect, test } from '@jest/globals';
import getFixturePath from '../src/makePath.js';

const file1 = 'file1.json';
const file2 = 'file2.yml';

const correctPass1 = '/mnt/e/frontend-project-lvl2/__fixtures__/file1.json';
const correctPass2 = '/mnt/e/frontend-project-lvl2/__fixtures__/file2.yml';

test('makePathWorks', () => {
  expect(getFixturePath(file1)).toBe(correctPass1);
  expect(getFixturePath(file2)).toBe(correctPass2);
});
