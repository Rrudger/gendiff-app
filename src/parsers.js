import { readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { cwd } from 'node:process';
import yaml from 'js-yaml';

const parsers = {
  '.yml': yaml.load,
  '.yaml': yaml.load,
  '.json': JSON.parse,
};
// Get document, or throw exception on error
export default function parseFile(filepath) {
  return parsers[extname(filepath)](readFileSync(resolve(cwd(), 'files', filepath), 'utf8'));
}
