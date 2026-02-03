module: dist/index.html meta.json meta-claude.json
	tar czf module.tar.gz meta.json dist meta-claude.json

dist/index.html: node_modules
	npm run build

node_modules: package.json
	npm install

setup-linux:
	which npm > /dev/null 2>&1 || \
	curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
	apt-get install -y nodejs

make module-beta: dist/index.html meta-beta.json
	@./etc/module-beta.sh

make module-claude: dist/index.html meta-claude.json
	@./etc/module-claude.sh