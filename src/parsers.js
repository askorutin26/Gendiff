import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filePath) => {
  const ext = path.extname(filePath);
  const fileData = fs.readFileSync(filePath, 'utf-8');
  switch (ext) {
    case '.yml':
    case '.yaml':
      return (yaml.load(fileData));
    case '.json':
      return (JSON.parse(fileData));
    default:
      throw new Error(console.log(filePath));
  }
};
export default parseFile;
