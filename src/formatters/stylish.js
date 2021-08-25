import _ from 'lodash';

const repeatIndent = (lvl) => ' '.repeat(lvl);
const baseIndentCount = 2;
const objIndentCount = 4;
const keyIndentCount = 8;

const toString = (data, indentLvl) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const indentForObj = repeatIndent(indentLvl + objIndentCount);
  const indentForKey = repeatIndent(indentLvl + keyIndentCount);
  const result = Object.entries(data).map(([key, value]) => `${indentForKey}${key}: ${toString(value, indentLvl + objIndentCount)}`);
  return `{\n${result.join('\n')}\n${indentForObj}}`;
};
const toStringHasChildren = (elem, indentLvl, f) => {
  const { key, children } = elem;
  const indent = repeatIndent(indentLvl + objIndentCount);
  return `${indent}${key}: {\n${f(children, indentLvl + objIndentCount)}\n${indent}}`;
};
const toStringChanged = (elem, indentLvl) => {
  const { key, oldValue, newValue } = elem;
  const indent = repeatIndent(indentLvl + baseIndentCount);
  return `${indent}- ${key}: ${toString(oldValue, indentLvl)}\n${indent}+ ${key}: ${toString(newValue, indentLvl)}`;
};

const stylishFormat = (diff) => {
  const iter = (data, lvl = 0) => {
    const result = data.map((elem) => {
      const { key, type, value } = elem;
      const indent = repeatIndent(lvl);
      switch (type) {
        case 'added':
          return `  ${indent}+ ${key}: ${toString(value, lvl)}`;
        case 'deleted':
          return `  ${indent}- ${key}: ${toString(value, lvl)}`;
        case 'unchanged':
          return `  ${indent}  ${key}: ${toString(value, lvl)}`;
        case 'changed':
          return toStringChanged(elem, lvl);
        case 'hasChildren':
          return toStringHasChildren(elem, lvl, iter);
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(diff)}\n}`;
};

export default stylishFormat;
