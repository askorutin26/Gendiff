import { expect, test } from '@jest/globals';
import genDiff from '../src/showDiff.js';
import parseFile from '../src/parsers.js';
import getFixturePath from '../src/makePath.js';

const nestedJson1 = 'file1Nested.json';
const nestedJson2 = 'file2Nested.json';

const nestedYml1 = 'file1Nested.yml';
const nestedYml2 = 'file2Nested.yml';

const correctStylishPath = getFixturePath('stylishNestedCorrect.txt');
const rightForNestedStylish = parseFile(correctStylishPath);

const correctPlainPath = getFixturePath('plainNestedCorrect.txt');
const rightForNestedPlain = parseFile(correctPlainPath);

const correctJsonPath = getFixturePath('jsonCorrect.txt');
const rigthForJson = parseFile(correctJsonPath);

test('stylishDiffWorks', () => {
  expect(genDiff(nestedJson1, nestedJson2, 'stylish')).toBe(rightForNestedStylish);
  expect(genDiff(nestedYml1, nestedYml2, 'stylish')).toBe(rightForNestedStylish);
});
test('plainDiffWorks', () => {
  expect(genDiff(nestedJson1, nestedJson2, 'plain')).toBe(rightForNestedPlain);
  expect(genDiff(nestedYml1, nestedYml2, 'plain')).toBe(rightForNestedPlain);
});
test('jsonDiffWorks', () => {
  expect(genDiff(nestedJson1, nestedJson2, 'json')).toBe(rigthForJson);
  expect(genDiff(nestedYml1, nestedYml2, 'json')).toBe(rigthForJson);
});
