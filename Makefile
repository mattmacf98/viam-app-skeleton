.PHONY: module

module: dist/index.html
	tar czf module.tar.gz meta.json dist

dist/index.html:
	npm run build
