import genDiff from '../src/gendiffFunc.js';
import { readFileSync } from 'node:fs';

const plainDiff = readFileSync('./__fixtures__/plainDiff.txt', 'utf-8');
const stylishDiff = readFileSync('./__fixtures__/stylishDiff.txt', 'utf-8');
test('gendiff stylish test', () => {
  expect(genDiff('file1.json', 'file2.json', 'stylish')
  .trim()).toMatch(stylishDiff.trim());
  expect(genDiff('file1.yml', 'file2.yml', 'stylish')
  .trim()).toMatch(stylishDiff.trim());
});

test('gendiff plain test', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')
  .trim()).toMatch(plainDiff.trim());
  expect(genDiff('file1.yml', 'file2.yml', 'plain')
  .trim()).toMatch(plainDiff.trim());
});
