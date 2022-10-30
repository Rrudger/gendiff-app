import { readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { cwd } from 'node:process';
import yaml from 'js-yaml';

const parsers = {
  '.yml': yaml.load,
  '.yaml': yaml.load,
  '.json': JSON.parse,
};

export default function parseFile(filepath) {
  return parsers[extname(filepath)](readFileSync(resolve(cwd(), 'test_fixtures', filepath), 'utf8'));
}
