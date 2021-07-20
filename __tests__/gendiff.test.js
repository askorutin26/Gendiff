import fs from 'fs';
import getFixturePath from '../src/makePath.js';
import genDiff from '../src/showDiff.js';

const file1 = 'file1.json';
const file2 = 'file2.json';

const correctResult = fs.readFileSync(getFixturePath('resultOfTest.txt'), 'utf-8');
test('genDiffWorks', () => {
  expect(genDiff(file1, file2)).toEqual(correctResult);
});
