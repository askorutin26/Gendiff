import _ from 'lodash';

const buildDiffTree = (object1, object2) => {
  const object1Keys = _.keys(object1);
  const object2Keys = _.keys(object2);
  const uniqKeys = _.sortBy(_.union(object1Keys, object2Keys));
  const mapping = (key) => {
    const object1Value = object1[key];
    const object2Value = object2[key];
    if (!_.has(object1, key)) {
      return {
        key,
        type: 'added',
        value: object2Value,
      };
    }
    if (!_.has(object2, key)) {
      return {
        key,
        type: 'deleted',
        value: object1Value,
      };
    }
    if (_.isPlainObject(object1Value) && _.isPlainObject(object2Value)) {
      return {
        key,
        type: 'hasChildren',
        children: buildDiffTree(object1[key], object2[key]),
      };
    }
    if (!_.isEqual(object1Value, object2Value)) {
      return {
        key,
        type: 'changed',
        oldValue: object1Value,
        newValue: object2Value,
      };
    }
    return {
      key,
      type: 'unchanged',
      value: object1Value,
    };
  };
  return uniqKeys.map((key) => mapping(key));
};

export default buildDiffTree;
