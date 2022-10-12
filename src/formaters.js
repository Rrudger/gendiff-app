import { readFileSync } from 'node:fs';
import _ from 'lodash';

const formaters = {
  'stylish': stylishFormater,
  'flat':flatFormater,
};

function flatFormater(obj) {
  let result = '{\n';
  Object.entries(obj).forEach((pair) => {
    result += `\t${pair[0]}: ${pair[1]}\n`;
  });
  result += '}';
  // return result;
  return 'Flat format';
}

function stylishFormater(str) {
  const primArr = str.split('').filter((ch) => ch !== '"').map((ch) => {
    switch(ch) {
      case "{":
        return '{\n';
        break;
      case "}":
        return '\n}';
        break;
      case ",":
        return ',\n';
        break;
      case ":":
        return ": ";
        break;
      default:
        return ch;
    }
  });
  let tabCount = 0;
  const secArr = primArr.join('').split('').filter((key) => key !== ',').map((key)=> {
    switch(key) {
      case "{":
        tabCount += 1;
        return key;
        break;
      case "}":
        tabCount -= 1;
        return key;
        break;
      case "\n":
        return `\n${_.repeat('   ', tabCount)}`;
        break;
      default:
        return key;
    }
  })
  return `${secArr.join('').slice(0,-4).trim()}\n}`;
}

export default function formater(obj, format) {
  return formaters[format](JSON.stringify(obj));
}
