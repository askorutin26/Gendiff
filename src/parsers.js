import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import getFixturePath from './makePath.js';

const parseFile = (fileName) => {
  const ext = path.extname(fileName);
  const filePath = getFixturePath(fileName);

  switch (ext) {
    case '.yaml' || '.yml':
      return yaml.load(fs.readFileSync(filePath, 'utf-8'));

    case '.json':
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    default:
      throw new Error('wrong extension!');
  }
};
export default parseFile;
