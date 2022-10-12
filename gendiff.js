#!/usr/bin/env node
import { program } from 'commander';
import genDiff from './src/gendiffFunc.js';
import formater from './src/formaters.js';

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1> <filepath2>')
  .action(() => {
    const temp = formater(genDiff(program.args[0], program.args[1]), program.opts().format);
    console.log(temp);
  });

program.parse(process.argv);
