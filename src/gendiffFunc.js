import _ from 'lodash';
import parseFile from './parsers.js';
import stylishFormater from './formaters/stylish.js';
import plainFormater from './formaters/plain.js';

const formaters = {
  stylish: stylishFormater,
  plain: plainFormater,
};

function recDiff(obj1, obj2, resObj) {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();
  keys.forEach((key) => {
    if (((typeof (obj1[key]) !== 'object') || (typeof (obj2[key]) !== 'object'))
     || obj1[key] === null || obj2[key] === null) {
      if (obj1[key] === obj2[key]) {
        resObj[`  ${key}`] = obj1[key];
      } else if (obj1[key] === undefined) {
        resObj[`+ ${key}`] = obj2[key];
      } else if (obj2[key] === undefined) {
        resObj[`- ${key}`] = obj1[key];
      } else {
        resObj[`- ${key}`] = obj1[key];
        resObj[`+ ${key}`] = obj2[key];
      }
    } else {
      let tempKey = key;
      const tempObj1 = obj1[key];
      const tempObj2 = obj2[key];
      if (obj1[key] === undefined) {
        tempKey = `+ ${key}`;
        resObj[tempKey] = _.cloneDeep(obj2[key]);
      } else if (obj2[key] === undefined) {
        tempKey = `- ${key}`;
        resObj[tempKey] = _.cloneDeep(obj1[key]);
      } else {
        resObj[tempKey] = {};
        recDiff(tempObj1, tempObj2, resObj[tempKey]);
      }
    }
  });
}

export default function genDiff(path1, path2, format) {
  const data1 = parseFile(path1);
  const data2 = parseFile(path2);
  const result = {};
  recDiff(data1, data2, result);
  return formaters[format](result);
}
