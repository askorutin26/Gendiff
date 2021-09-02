import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filePath, data) => {
  const format = path.extname(filePath);
  switch (format) {
    case '.yml':
    case '.yaml':
      return (yaml.load(data));
    case '.json':
      return (JSON.parse(data));
    case '.txt':
      return data;
    default:
      throw new Error(console.log(filePath));
  }
};
export default parseFile;
