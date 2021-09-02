import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import parseFile from '../src/parsers.js';
import genDiff from '../src/showDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const nestedJson1 = getFixturePath('file1Nested.json');
const nestedJson2 = getFixturePath('file2Nested.json');

const nestedYml1 = getFixturePath('file1Nested.yml');
const nestedYml2 = getFixturePath('file2Nested.yml');

const correctStylishPath = getFixturePath('stylishCorrect.txt');
const rightForStylish = parseFile(correctStylishPath);

const correctPlainPath = getFixturePath('plainCorrect.txt');
const rightForPlain = parseFile(correctPlainPath);

const correctJsonPath = getFixturePath('jsonCorrect.txt');
const rigthForJson = parseFile(correctJsonPath);

test('stylishDiffWorks', () => {
  expect(genDiff(nestedJson1, nestedJson2, 'stylish')).toBe(rightForStylish);
  expect(genDiff(nestedYml1, nestedYml2, 'stylish')).toBe(rightForStylish);
});
test('plainDiffWorks', () => {
  expect(genDiff(nestedJson1, nestedJson2, 'plain')).toBe(rightForPlain);
  expect(genDiff(nestedYml1, nestedYml2, 'plain')).toBe(rightForPlain);
});
test('jsonDiffWorks', () => {
  expect(genDiff(nestedJson1, nestedJson2, 'json')).toBe(rigthForJson);
  expect(genDiff(nestedYml1, nestedYml2, 'json')).toBe(rigthForJson);
});
