import genDiff from '../src/gendiffFunc.js';
import { readFileSync } from 'node:fs';

test('test for test', () => {
  const diffData = readFileSync('./__fixtures__/fileDiff.txt', 'utf-8');
  console.log(diffData);
  expect(genDiff('file1.json', 'file2.json').trim()).toMatch(diffData.trim());
});
