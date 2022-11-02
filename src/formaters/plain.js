import _ from 'lodash';

function getPath(path, key) {
  const finalPath = `${path.join('.')}.${key.slice(2)}`;
  return finalPath[0] === '.' ? finalPath.slice(1) : finalPath;
}

function checkValue(value) {
  return typeof (value) === 'string' ? `'${value}'` : value;
}

function plainRec(obj, path) {
  return Object.keys(obj).reduce((resArr, key, index, array) => {
    if (key[0] === '-') {
      if ((index < array.length - 1) && (key.slice(2) === array[index + 1].slice(2))) {
        return [...resArr, `Property '${getPath(path, key)}' was updated. From ${checkValue(obj[key])} to ${checkValue(obj[array[index + 1]])}`];
      }
      return [...resArr, `Property '${getPath(path, key)}' was removed`];
    }
    if (key[0] === '+') {
      if ((index === 0) || (key.slice(2) !== array[index - 1].slice(2))) {
        return [...resArr, `Property '${getPath(path, key)}' was added with value: ${checkValue(obj[key])}`];
      }
    }
    if ((typeof (obj[key]) === 'object') && (obj[key]) !== null) {
      const newPath = [...path, key.trim()];
      return [...resArr, ...plainRec(obj[key], newPath)];
    }
    return resArr;
  }, []);
}

export default function plainFormater(obj) {
  const path = [];
  const result = plainRec(obj, path);
  return result.map((str) => {
    if (str.includes('object')) return _.replace(str, 'object Object', 'complex value');
    return str;
  })
    .join('\n');
}
