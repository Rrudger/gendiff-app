#!/usr/bin/env node
import { program } from 'commander';
import genDiff from './src/gendiffFunc.js';

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1> <filepath2>')
  .action(() => {
    console.log(genDiff(program.args[0], program.args[1]));
  });

program.parse(process.argv);
