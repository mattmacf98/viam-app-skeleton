module: dist/index.html meta.json
	tar czf module.tar.gz meta.json dist

dist/index.html: node_modules
	npm run build

node_modules: package.json
	npm install

setup-linux-claude:
	setup-linux
	cp meta-claude.json meta.json

setup-linux:
	which npm > /dev/null 2>&1 || \
	curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
	apt-get install -y nodejs

module-beta: dist/index.html meta-beta.json
	@./etc/module-beta.sh