import genDiff from '../src/gendiffFunc.js';
import { readFileSync } from 'node:fs';

test('json test', () => {
  const diffData = readFileSync('./__fixtures__/fileDiff.txt', 'utf-8');
  expect(genDiff('file1.json', 'file2.json').trim()).toMatch(diffData.trim());
});

test('yaml test', () => {
  const diffData = readFileSync('./__fixtures__/fileDiff.txt', 'utf-8');
  expect(genDiff('file1.yml', 'file2.yml').trim()).toMatch(diffData.trim());
});
