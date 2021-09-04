import yaml from 'js-yaml';

const parseFile = (extension, data) => {
  switch (extension) {
    case '.yml':
    case '.yaml':
      return (yaml.load(data));
    case '.json':
      return (JSON.parse(data));
    case '.txt':
      return data;
    default:
      throw new Error(`wrong extension type: ${extension}`);
  }
};
export default parseFile;
