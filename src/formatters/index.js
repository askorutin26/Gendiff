import stylishFormat from './stylish.js';
import plainFormat from './plain.js';

const formatData = (data, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylishFormat(data);
    case 'plain':
      return plainFormat(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Uknown formatter: ${formatter}`);
  }
};

export default formatData;
