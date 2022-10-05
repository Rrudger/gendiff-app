install: install-deps

run:
	bin/nodejs-package.js 10

install-deps:
	npm ci

lint:
	npx eslint .

test:
	npm test

publish:
	npm publish --dry-run
