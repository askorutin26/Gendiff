import path from 'path';
import yaml from 'js-yaml';
import * as fs from 'fs';

const parseFile = (filePath) => {
  const format = path.extname(filePath);
  const data = fs.readFileSync(filePath, 'utf-8');
  switch (format) {
    case '.yml':
    case '.yaml':
      return (yaml.load(data));
    case '.json':
      return (JSON.parse(data));
    case '.txt':
      return data;
    default:
      throw new Error(`wrong extension type: ${format}`);
  }
};
export default parseFile;
