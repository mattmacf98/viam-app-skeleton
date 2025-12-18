module: dist/index.html meta.json start.sh
	chmod +x start.sh
	tar czf module.tar.gz meta.json dist start.sh

dist/index.html: node_modules
	npm run build

node_modules: package.json
	npm install

setup-linux:
	which npm > /dev/null 2>&1 || \
	curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
	apt-get install -y nodejs