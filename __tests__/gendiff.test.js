import genDiff from '../src/gendiffFunc.js';
import formater from '../src/formaters.js';
import { readFileSync } from 'node:fs';

const diffData = readFileSync('./__fixtures__/diff.txt', 'utf-8');
test('gendiff test', () => {
  expect(formater(genDiff('file1.json', 'file2.json'), 'stylish')
  .trim()).toMatch(diffData.trim());
  expect(formater(genDiff('file1.yml', 'file2.yml'), 'stylish')
  .trim()).toMatch(diffData.trim());
});
