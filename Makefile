module: dist/index.html meta.json
	tar czf module.tar.gz meta.json dist

dist/index.html: node_modules
	pnpm run build

node_modules: package.json
	pnpm install