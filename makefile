install: install-deps

run:
	bin/nodejs-package.js 10

install-deps:
	npm ci

lint:
	npx eslint .

test:
	npm test --verbose --watch

publish:
	npm publish --dry-run
