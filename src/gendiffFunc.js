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

function addRec(obj, resultObj) {
Object.keys(obj).forEach((key) => {
  if ((typeof(obj[key]) !== 'object') || ((obj[key]) === null)) {
    const tempKey = (key[0] === '+' || key[0] === '-') ? key : `  ${key}`;
    resultObj[tempKey] = obj[key];
  } else {
     const temp = (key[0] === '+' || key[0] === '-') ? key : `  ${key}`;
    resultObj[temp] = {};
    addRec(obj[key], resultObj[temp]);
  }
})
}
function addTab(obj) {
  const result = {};
  addRec(obj, result);
  return result;
};

const t = {
  ine: 'dfdfdf',
  two: 'dfdf',
  three: {
    etet: "dfdfdf",
    key: 555
  }
};
// console.log(addTab(t));


function recDiff(obj1, obj2, resObj) {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();
  keys.forEach((k) => {
    if (((typeof (obj1[k]) !== 'object') || (typeof (obj2[k]) !== 'object'))
     || obj1[k] === null || obj2[k] === null) {
      if (obj1[k] === obj2[k]) {
        //console.log(`Case1: ${k}: ${obj1[k]}`);
        //resObj[`  ${k}`] = obj1[k];
        resObj[k] = obj1[k];
      } else if (obj1[k] === undefined) {
        //console.log(`Case 2: ${k}: ${obj2[k]}`);
        resObj[`+ ${k}`] = obj2[k];
      } else if (obj2[k] === undefined) {
        //console.log(`Case 3: ${k}: ${obj1[k]}`);
        resObj[`- ${k}`] = obj1[k];
      } else {
        //console.log(`Case 4: ${k}: ${obj1[k]}`);
        //console.log(`${k}: ${obj2[k]}`);
        resObj[`- ${k}`] = obj1[k];
        resObj[`+ ${k}`] = obj2[k];
      }
    } else {
      //let tempKey = `  ${k}`;
      let tempKey = k;
      const tempObj1 = obj1[k];
      const tempObj2 = obj2[k];
      if (obj1[k] === undefined) {
        //console.log(`${k}: ${obj2[k]}`);
        tempKey = `+ ${k}`;
        resObj[tempKey] = _.cloneDeep(obj2[k]);
      } else if (obj2[k] === undefined) {
        //console.log(`${k}: ${obj1[k]}`);
        tempKey = `- ${k}`;
        resObj[tempKey] = _.cloneDeep(obj1[k]);
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
  return formaters[format](addTab(result));
}
