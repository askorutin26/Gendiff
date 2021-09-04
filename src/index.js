import path from 'path';
import * as fs from 'fs';
import process from 'process';
import parseFile from './parser.js';
import buildDiffTree from './buildDiffTree.js';
import formatData from './formatters/index.js';

const getFullPath = (fileName) => {
  const filePath = path.resolve(process.cwd(), fileName);
  return filePath;
};
const getExtension = (filePath) => path.extname(filePath);
const getData = (filePath) => fs.readFileSync(filePath, 'utf-8');

const genDiff = (file1, file2, formatter = 'stylish') => {
  const file1Path = getFullPath(file1);
  const file2Path = getFullPath(file2);

  const file1Ext = getExtension(file1);
  const file2Ext = getExtension(file2);

  const file1Data = getData(file1Path);
  const file2Data = getData(file2Path);

  const parsedData1 = parseFile(file1Ext, file1Data);
  const parsedData2 = parseFile(file2Ext, file2Data);

  const diffTree = buildDiffTree(parsedData1, parsedData2);
  const diffOutput = formatData(diffTree, formatter);

  return diffOutput;
};
export default genDiff;
