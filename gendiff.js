#!/usr/bin/env node
import { program } from 'commander';
import { readFileSync } from 'node:fs';
import {resolve} from 'node:path';
import { cwd } from 'node:process';

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1> <filepath2>')
  .action(() => {
    console.log(genDiff(program.args[0], program.args[1]));
  });;

program.parse(process.argv);

export default function genDiff(path1, path2) {
  const pathStr1 = path1.split('/');
  const pathStr2 = path2.split('/');
  const data1 = JSON.parse(readFileSync(resolve(cwd(), 'files', pathStr1[pathStr1.length - 1]), 'utf-8'));
  const data2 = JSON.parse(readFileSync(resolve(cwd(), 'files', pathStr2[pathStr2.length - 1]), 'utf-8'));
  const keysArr = [... new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();
  const result = {};
  keysArr.forEach((keyword) => {
    if (data1[keyword] === data2[keyword]) {
      result[keyword] = data1[keyword];
    } else if (data1[keyword] === undefined){
      result[`+ ${keyword}`] = data2[keyword];
    } else if (data2[keyword] === undefined){
      result[`- ${keyword}`] = data1[keyword]
    } else {
      result[`- ${keyword}`] = data1[keyword];
      result[`+ ${keyword}`] = data2[keyword];
    };
  });
  return result;
}
