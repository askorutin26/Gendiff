import fs from 'fs';
import getFixturePath from './makePath.js';
import parseFile from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import formatData from './formatters/index.js';

const genDiff = (file1, file2, formatter) => {
  const file1Path = getFixturePath(file1);
  const file2Path = getFixturePath(file2);

  const file1Data = fs.readFileSync(file1Path, 'utf-8');
  const file2Data = fs.readFileSync(file2Path, 'utf-8');

  const parsedData1 = parseFile(file1Path, file1Data);
  const parsedData2 = parseFile(file2Path, file2Data);

  const diffTree = buildDiffTree(parsedData1, parsedData2);
  const diffTreeAsStr = formatData(diffTree, formatter);

  return diffTreeAsStr;
};
export default genDiff;
