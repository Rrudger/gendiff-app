import _ from 'lodash';
import parseFile from './parsers.js';
import stylishFormater from './formaters/stylish.js';
import plainFormater from './formaters/plain.js';
import jsonFormater from './formaters/json.js';

const formaters = {
  stylish: stylishFormater,
  plain: plainFormater,
  json: jsonFormater,
};

function addTab(obj) {
  return Object.keys(obj).reduce((resObj, key) => {
    if ((typeof (obj[key]) !== 'object') || ((obj[key]) === null)) {
      const tempKey = (key[0] === '+' || key[0] === '-') ? key : `  ${key}`;
      return { ...resObj, [tempKey]: obj[key] };
    }
    const temp = (key[0] === '+' || key[0] === '-') ? key : `  ${key}`;
    return { ...resObj, [temp]: addTab(obj[key]) };
  }, {});
}

function recDiff(obj1, obj2) {
  const keys = _.sortBy([...new Set([...Object.keys(obj1), ...Object.keys(obj2)])]);
  return keys.reduce((resObj, k) => {
    if (((typeof (obj1[k]) !== 'object') || (typeof (obj2[k]) !== 'object'))
    || obj1[k] === null || obj2[k] === null) {
      if (obj1[k] === obj2[k]) {
        return { ...resObj, [k]: obj1[k] };
      }
      if (obj1[k] === undefined) {
        return { ...resObj, [`+ ${k}`]: obj2[k] };
      }
      if (obj2[k] === undefined) {
        return { ...resObj, [`- ${k}`]: obj1[k] };
      }
      return { ...resObj, [`- ${k}`]: obj1[k], [`+ ${k}`]: obj2[k] };
    }
    if (obj1[k] === undefined) {
      return { ...resObj, [`+ ${k}`]: _.cloneDeep(obj2[k]) };
    }
    if (obj2[k] === undefined) {
      return { ...resObj, [`- ${k}`]: _.cloneDeep(obj1[k]) };
    }
    return { ...resObj, [k]: recDiff(obj1[k], obj2[k]) };
  }, {});
}

export default function genDiff(path1, path2, format = 'stylish') {
  return formaters[format](addTab(recDiff(parseFile(path1), parseFile(path2))));
}
