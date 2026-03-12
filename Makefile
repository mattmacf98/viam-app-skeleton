module: dist/index.html meta.json
	tar czf module.tar.gz meta.json dist

dist/index.html: node_modules
	npm run build

node_modules: package.json
	npm install

setup-linux:
	@if node --version 2>/dev/null | grep -q '^v22\.'; then \
		echo "Node 22 already installed"; \
	else \
		echo "Installing Node 22..."; \
		curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
		apt-get install -y nodejs; \
	fi

module-beta: dist/index.html meta-beta.json
	@./etc/module-beta.sh