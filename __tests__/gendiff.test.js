import { expect, test } from '@jest/globals';
import genDiff from '../src/showDiff.js';
import parseFile from '../src/parsers.js';
import getFixturePath from '../src/makePath.js';

const file1NestedPath = 'file1Nested.json';
const file2NestedPath = 'file2Nested.json';

const correctStylishPath = getFixturePath('stylishNestedCorrect.txt');
const rightForNestedStylish = parseFile(correctStylishPath);

const correctPlainPath = getFixturePath('plainNestedCorrect.txt');
const rightForNestedPlain = parseFile(correctPlainPath);

test('stylishDiffWorks', () => {
  expect(genDiff(file1NestedPath, file2NestedPath, 'stylish')).toBe(rightForNestedStylish);
});
test('plainDiffWorks', () => {
  expect(genDiff(file1NestedPath, file2NestedPath, 'plain')).toBe(rightForNestedPlain);
});
