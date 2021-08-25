import _ from 'lodash';

const valueToString = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const plainFormat = (diffTree) => {
  const iter = (data, key = []) => {
    const dataFiltered = data.filter(({ type }) => type !== 'unchanged');
    const result = dataFiltered.map((elem) => {
      const keys = [...key, elem.key];
      const { type, value } = elem;
      switch (type) {
        case 'added':
          return `Property '${keys.join('.')}' was added with value: ${valueToString(value)}`;
        case 'deleted':
          return `Property '${keys.join('.')}' was removed`;
        case 'changed': {
          const { oldValue, newValue } = elem;
          return `Property '${keys.join('.')}' was updated. From ${valueToString(oldValue)} to ${valueToString(newValue)}`;
        }
        case 'hasChildren':
          return iter(elem.children, keys);
        default:
          throw new Error(`Unknown node type: ${type}`);
      }
    });
    return result.join('\n');
  };
  return iter(diffTree);
};
export default plainFormat;
