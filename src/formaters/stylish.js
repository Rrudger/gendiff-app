import _ from 'lodash';
import { writeFileSync } from 'node:fs';

export default function stylishFormater(obj) {
  const str = JSON.stringify(obj);
  const primArr = str.split('').filter((ch) => ch !== '"').map((ch) => {
    switch (ch) {
      case '{':
        return '{\n';
      case '}':
        return '\n}';
      case ',':
        return ',\n';
      case ':':
        return ': ';
      default:
        return ch;
    }
  });
  let tabCount = 0;
  const secArr = primArr.join('').split('').filter((key) => key !== ',').map((key) => {
    switch (key) {
      case '{':
        tabCount += 1;
        return key;
      case '}':
        tabCount -= 1;
        return key;
      case '\n':
        return tabCount > 1 ? `\n${_.repeat('  ', tabCount + (tabCount - 1))}`: `\n${_.repeat('\t', tabCount)}`;
        // return `\n${_.repeat('\t', tabCount)}`;
      default:
        return key;
    }
  });
  const terzArr = secArr.join('').split('').map((key, index, arr) => {
    if ((arr[index + 1] !== '}' && arr[index + 2] !== '}') || index + 1 === arr.length - 1) {
      return key;
  }
  });
  const resStr = `${terzArr.join('').slice(0, -2).trim()}\n}`;
  writeFileSync('./test_fixtures/try.txt', resStr);
  return resStr;
}
