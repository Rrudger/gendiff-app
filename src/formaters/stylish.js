import _ from 'lodash';

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
  const secArr = primArr.join('').split('').filter((key) => key !== ',').map((key, index, arr) => {
    switch (key) {
      case '\n':
        const tabCount = (arr.slice(0, index).filter((k) => k === '{').length) - (arr.slice(0, index).filter((k) => k === '}').length);
        return tabCount > 1 ? `\n${_.repeat('  ', tabCount + (tabCount - 1))}` : '\n  ';
      default:
        return key;
    }
  });
  const terzArr = secArr.join('').split('').filter((key, index, arr) => (arr[index + 1] !== '}' && arr[index + 2] !== '}') || index + 1 === arr.length - 1);
  const resStr = `${terzArr.join('').slice(0, -2).trim()}\n}`;
  return resStr;
}
