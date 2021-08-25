import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filePath) => {
  const format = path.extname(filePath);
  const fileData = fs.readFileSync(filePath, 'utf-8');
  switch (format) {
    case '.yml':
    case '.yaml':
      return (yaml.load(fileData));
    case '.json':
      return (JSON.parse(fileData));
    case '.txt':
      return fileData;
    default:
      throw new Error(console.log(filePath));
  }
};
export default parseFile;
