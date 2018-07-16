all:
	cd frontend && npm install && npm run build
	cd backend && npm install

.PHONY: all

run: all
	cd backend && PG_CONN_STRING=blah forever restart src/app.js

.PHONY: run
