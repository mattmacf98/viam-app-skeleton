module: dist/index.html meta.json
	tar czf module.tar.gz meta.json dist

dist/index.html: node_modules
	npm run build

node_modules: package-lock.json
	npm ci

setup-linux:
	which npm > /dev/null 2>&1 || \
	curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
	apt-get install -y nodejs