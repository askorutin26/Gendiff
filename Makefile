install:
	npm ci
lint:
	npx eslint .
link:
	npm link
lint-fix:
	npx eslint . --fix
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8