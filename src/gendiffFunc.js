import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

function makeStr(obj) {
  let result = '{\n';
  Object.entries(obj).forEach((pair) => {
    result += `\t${pair[0]}: ${pair[1]}\n`
  });
  result += '}';
  return result;
}

export default function genDiff(path1, path2) {
  const data1 = JSON.parse(readFileSync(resolve(cwd(), 'files', path1), 'utf-8'));
  const data2 = JSON.parse(readFileSync(resolve(cwd(), 'files', path2), 'utf-8'));
  const keysArr = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();
  const result = {};
  keysArr.forEach((keyword) => {
    if (data1[keyword] === data2[keyword]) {
      result[`  ${keyword}`] = data1[keyword];
    } else if (data1[keyword] === undefined) {
      result[`+ ${keyword}`] = data2[keyword];
    } else if (data2[keyword] === undefined) {
      result[`- ${keyword}`] = data1[keyword];
    } else {
      result[`- ${keyword}`] = data1[keyword];
      result[`+ ${keyword}`] = data2[keyword];
    }
  });
  return makeStr(result);
}
