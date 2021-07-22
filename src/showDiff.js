import _ from 'lodash';
import getFixturePath from './makePath.js';
import parseFile from './parsers.js';

const genDiff = (file1, file2) => {
  const filePath1 = getFixturePath(file1);
  const filePath2 = getFixturePath(file2);

  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);

  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const allKeys = _.union(data1Keys, data2Keys).sort();

  const reducerLogic = (acc, element) => {
    if (_.has(data1, element) && _.has(data2, element) && data1[element] === data2[element]) {
      acc.push(`    ${element}: ${data1[element]}`);
    }
    if (_.has(data1, element) && !_.has(data2, element)) { acc.push(`  - ${element}: ${data1[element]}`); }
    if (_.has(data2, element) && !_.has(data1, element)) { acc.push(`  + ${element}: ${data2[element]}`); }
    if (_.has(data1, element) && _.has(data2, element) && data1[element] !== data2[element]) {
      acc.push(`  - ${element}: ${data1[element]}`);
      acc.push(`  + ${element}: ${data2[element]}`);
    }
    return acc;
  };
  const result = `{\n${allKeys.reduce(reducerLogic, []).join('\n')}\n}`;
  return (result);
};
export default genDiff;
