import getFixturePath from './makePath.js';
import parseFile from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import formatData from './formatters/index.js';

const genDiff = (file1, file2, formatter) => {
  const filePath1 = getFixturePath(file1);
  const filePath2 = getFixturePath(file2);

  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);

  const diffTree = buildDiffTree(data1, data2);
  const diffTreeAsStr = formatData(diffTree, formatter);

  return diffTreeAsStr;
};
export default genDiff;
