# for running two tasks in parallel
.PHONY: make 
MAKEFLAGS=-j2

# start server for local react development
frontend:
	npm start

# start server for local go development
server:
	go run backend/main.go

# start both servers in parallel
run: $(MAKE) frontend server

# build react deliverable 
build-frontend:
	npm run build

# build go deliverable to gcp with cloud build
build-backend:
	cd backend; gcloud builds submit --tag gcr.io/chainalysis-takehome/backend

# build both frontend and backend sequentially
.PHONY: build
build: build-frontend build-backend

# deploy react deliverable to firebase hosting
deploy-frontend: 
	firebase deploy

# deploy go deliverable to gcp cloud run
deploy-backend:
	gcloud run deploy --image gcr.io/chainalysis-takehome/backend

# deploy both react and go sequentially
deploy: deploy-frontend deploy-backend
