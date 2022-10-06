import genDiff from '../src/gendiffFunc.js';
import { readFileSync } from 'node:fs';

const diffData = readFileSync('./__fixtures__/fileDiff.txt', 'utf-8');
test('json test', () => {
  expect(genDiff('file1.json', 'file2.json').trim()).toMatch(diffData.trim());
});

test('yaml test', () => {
  expect(genDiff('file1.yml', 'file2.yml').trim()).toMatch(diffData.trim());
});
