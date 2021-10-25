MAKEFLAGS=-j2

frontend:
	npm start

server:
	go run backend/main.go

run: $(MAKE) frontend server

build-frontend:
	npm run build

build-backend:
	cd backend; gcloud builds submit --tag gcr.io/chainalysis-takehome/backend

build: build-frontend build-backend

deploy-frontend: 
	firebase deploy

deploy-backend:
	gcloud run deploy --image gcr.io/chainalysis-takehome/backend

deploy: deploy-frontend deploy-backend