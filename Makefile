all:
	cd frontend && npm install && npm run build
	cd backend && npm install

.PHONY: all

run: all
	cd backend && node src/app.js

.PHONY: run
