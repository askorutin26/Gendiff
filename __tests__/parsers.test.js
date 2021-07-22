import { expect, test } from '@jest/globals';
import parseFile from '../src/parsers.js';
import getFixturePath from '../src/makePath.js';

const name1 = getFixturePath('file1.json');
const name2 = getFixturePath('file1.yml');

test('parsersWorks', () => {
  expect(parseFile(name1)).toStrictEqual(parseFile(name2));
});
