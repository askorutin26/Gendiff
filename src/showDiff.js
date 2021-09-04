import path from 'path';
import * as fs from 'fs';
import parseFile from './parser.js';
import buildDiffTree from './buildDiffTree.js';
import formatData from './formatters/index.js';
import getPath from './makePath.js';

const genDiff = (file1, file2, formatter = 'stylish') => {
  const file1Path = getPath(file1);
  const file2Path = getPath(file2);

  const file1Ext = path.extname(file1);
  const file2Ext = path.extname(file2);

  const file1Data = fs.readFileSync(file1Path, 'utf-8');
  const file2Data = fs.readFileSync(file2Path, 'utf-8');

  const parsedData1 = parseFile(file1Ext, file1Data);
  const parsedData2 = parseFile(file2Ext, file2Data);

  const diffTree = buildDiffTree(parsedData1, parsedData2);
  const diffOutput = formatData(diffTree, formatter);

  return diffOutput;
};
export default genDiff;
