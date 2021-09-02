import parseFile from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import formatData from './formatters/index.js';
import getPath from './makePath.js';

const genDiff = (file1, file2, formatter = 'stylish') => {
  const file1Path = getPath(file1);
  const file2Path = getPath(file2);

  const parsedData1 = parseFile(file1Path);
  const parsedData2 = parseFile(file2Path);

  const diffTree = buildDiffTree(parsedData1, parsedData2);
  const diffOutput = formatData(diffTree, formatter);

  return diffOutput;
};
export default genDiff;
