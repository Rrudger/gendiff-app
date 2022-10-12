import _ from 'lodash';

function stylishFormater(str) {
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
        return `\n${_.repeat('   ', tabCount)}`;
      default:
        return key;
    }
  });
  return `${secArr.join('').slice(0, -4).trim()}\n}`;
}

const formaters = {
  stylish: stylishFormater,
};

export default function formater(obj, format) {
  return formaters[format](JSON.stringify(obj));
}
