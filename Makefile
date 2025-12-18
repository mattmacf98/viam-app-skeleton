module: dist/index.html meta.json bin/viam-app-skeleton
	tar czf module.tar.gz meta.json dist bin/viam-app-skeleton

dist/index.html: node_modules
	npm run build

node_modules: package.json
	npm install

setup-linux:
	which npm > /dev/null 2>&1 || \
	curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
	apt-get install -y nodejs

bin:
	mkdir -p bin

bin/viam-app-skeleton: bin module.go
	go build -o bin/viam-app-skeleton module.go