const { program } = require('commander');

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1> <filepath2>');

program.parse(process.argv);

const options = program.opts();
console.log(program.args);
