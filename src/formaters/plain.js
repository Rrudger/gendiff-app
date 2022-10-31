import _ from 'lodash';

function getPath(path, key) {
  const finalPath = `${path.join('.')}.${key.slice(2)}`;
  return finalPath[0] === '.' ? finalPath.slice(1) : finalPath;
}

function checkValue(value) {
  return typeof (value) === 'string' ? `'${value}'` : value;
}

function plainRec(obj, path, result) {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    if ((typeof (obj[keys[i]]) !== 'object') || (obj[keys[i]]) === null) {
      if ((i < keys.length - 1) && (keys[i].slice(2) === keys[i + 1].slice(2))) {
        const newValue = `Property '${getPath(path, keys[i])}' was updated. From ${checkValue(obj[keys[i]])} to ${checkValue(obj[keys[i + 1]])}`;
        result = [...result, ...newValue];
        //result.push(`Property '${getPath(path, keys[i])}' was updated. From ${checkValue(obj[keys[i]])} to ${checkValue(obj[keys[i + 1]])}`);
        i += 1;
      } else if ((keys[i][0] === '+')) {
        result.push(`Property '${getPath(path, keys[i])}' was added with value: ${checkValue(obj[keys[i]])}`);
      } else if (keys[i][0] === '-') {
        result.push(`Property '${getPath(path, keys[i])}' was removed`);
      }
    } else if ((i < keys.length - 1) && (keys[i].slice(2) === keys[i + 1].slice(2))) {
      const value1 = (typeof (obj[keys[i]]) === 'object' ? '[complex value]' : checkValue(obj[keys[i]]));
      const value2 = (typeof (obj[keys[i + 1]]) === 'object' ? '[complex value]' : checkValue(obj[keys[i + 1]]));
      result.push(`Property '${getPath(path, keys[i])}' was updated. From ${value1} to ${value2}`);
      i += 1;
    } else if (keys[i][0] === '+') {
      result.push(`Property '${getPath(path, keys[i])}' was added with value: [complex value]`);
    } else if (keys[i][0] === '-') {
      result.push(`Property '${getPath(path, keys[i])}' was removed`);
    } else {
      const newPath = path;
      newPath.push(keys[i].trim());
      plainRec(obj[keys[i]], newPath, result);
    }
    if (i === keys.length - 1) path.pop();
  }
}

export default function plainFormater(obj) {
  const result = [];
  const path = [];
  plainRec(obj, path, result);
  return result.map((str) => str.includes('object') ? _.replace(str, 'object Object', 'complex value') : str)
    .join('\n');
}
