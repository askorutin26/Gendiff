import { expect, test } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/showDiff.js';
import parseFile from '../src/parsers.js';
import getFixturePath from '../src/makePath.js';

const nestedJson1 = 'file1Nested.json';
const nestedJson2 = 'file2Nested.json';

const nestedYml1 = 'file1Nested.yml';
const nestedYml2 = 'file2Nested.yml';

const correctStylishPath = getFixturePath('stylishCorrect.txt');
const correctStylishData = fs.readFileSync(correctStylishPath, 'utf-8');
const rightForStylish = parseFile(correctStylishPath, correctStylishData);

const correctPlainPath = getFixturePath('plainCorrect.txt');
const correctPlainData = fs.readFileSync(correctPlainPath, 'utf-8');
const rightForPlain = parseFile(correctPlainPath, correctPlainData);

const correctJsonPath = getFixturePath('jsonCorrect.txt');
const correctJsonData = fs.readFileSync(correctJsonPath, 'utf-8');
const rigthForJson = parseFile(correctJsonPath, correctJsonData);

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
