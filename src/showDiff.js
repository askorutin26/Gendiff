import * as fs from 'fs';
import _ from 'lodash';
import getFixturePath from './makePath.js';

const genDiff = (file1, file2) => {
  const file1Path = getFixturePath(file1);
  const file2Path = getFixturePath(file2);

  const data1 = JSON.parse(fs.readFileSync(file1Path, 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(file2Path, 'utf-8'));

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
