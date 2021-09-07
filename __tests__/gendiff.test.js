/* eslint-disable no-undef */
import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import { dirname } from 'path';
import parseFile from '../src/parser.js';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getData = (filePath) => fs.readFileSync(filePath, 'utf-8');

const nestedJson1 = getFixturePath('file1Nested.json');
const nestedJson2 = getFixturePath('file2Nested.json');

const nestedYml1 = getFixturePath('file1Nested.yml');
const nestedYml2 = getFixturePath('file2Nested.yml');

const correctStylishPath = getFixturePath('stylishCorrect.txt');
const correctStylishData = getData(correctStylishPath);
const rightForStylish = parseFile('.txt', correctStylishData);

const correctPlainPath = getFixturePath('plainCorrect.txt');
const correctPlainData = getData(correctPlainPath);
const rightForPlain = parseFile('.txt', correctPlainData);

const correctJsonPath = getFixturePath('jsonCorrect.txt');
const correctJsonData = getData(correctJsonPath);
const rigthForJson = parseFile('.txt', correctJsonData);

test.each([
  ['stylishDiffWorks1', nestedJson1, nestedJson2, 'stylish', rightForStylish],
  ['stylishDiffWorks2', nestedYml1, nestedYml2, 'stylish', rightForStylish],
  ['plainDiffWorks1', nestedJson1, nestedJson2, 'plain', rightForPlain],
  ['plainDiffWorks2', nestedYml1, nestedYml2, 'plain', rightForPlain],
  ['jsonDiffWorks1', nestedJson1, nestedJson2, 'json', rigthForJson],
  ['jsonDiffWorks2', nestedYml1, nestedYml2, 'json', rigthForJson]])('%s', (name, file1, file2, format, expected) => { expect(genDiff(file1, file2, format)).toBe(expected); });
