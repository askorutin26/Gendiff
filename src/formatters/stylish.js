import _ from 'lodash';

const repeatIndent = (count, placeholder) => placeholder.repeat(count);
const indentShift = 2;
const baseIndentCount = 4;
const placeholder = ' ';

const toString = (data, indentLvl) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const indentForObj = repeatIndent(indentLvl + baseIndentCount, placeholder);
  const indentForKey = repeatIndent(indentLvl + (indentShift * baseIndentCount), placeholder);
  const result = Object.entries(data).map(([key, value]) => `${indentForKey}${key}: ${toString(value, indentLvl + baseIndentCount)}`);
  return `{\n${result.join('\n')}\n${indentForObj}}`;
};
const toStringHasChildren = (elem, indentLvl, f) => {
  const { key, children } = elem;
  const indent = repeatIndent(indentLvl + baseIndentCount, placeholder);
  return `${indent}${key}: {\n${f(children, indentLvl + baseIndentCount)}\n${indent}}`;
};
const toStringChanged = (elem, indentLvl) => {
  const { key, oldValue, newValue } = elem;
  const indent = repeatIndent(indentLvl + indentShift, placeholder);
  return `${indent}- ${key}: ${toString(oldValue, indentLvl)}\n${indent}+ ${key}: ${toString(newValue, indentLvl)}`;
};

const stylishFormat = (diff) => {
  const iter = (data, lvl = 0) => {
    const result = data.map((elem) => {
      const { key, type, value } = elem;
      const indent = repeatIndent(lvl + indentShift, placeholder);
      switch (type) {
        case 'added':
          return `${indent}+ ${key}: ${toString(value, lvl)}`;
        case 'deleted':
          return `${indent}- ${key}: ${toString(value, lvl)}`;
        case 'unchanged':
          return `${indent}  ${key}: ${toString(value, lvl)}`;
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
