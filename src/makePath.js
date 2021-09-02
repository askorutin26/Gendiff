import path from 'path';
import process from 'process';

const getPath = (fileName) => path.resolve(process.cwd(), fileName);

const getFullPath = (filePath) => getPath(filePath);

export default getFullPath;
