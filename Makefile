module: dist/index.html meta.json
	tar czf module.tar.gz meta.json dist

dist/index.html: node_modules
	npm run build

node_modules: package.json
	npm install

setup-linux:
	which npm > /dev/null 2>&1 || \
	curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
	apt-get install -y nodejs