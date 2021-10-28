# Chainalysis Takehome
# CoinPicker

## Contents
[Purpose and Extensibility](#purpose-and-extensibility)

[How It Works](#how-it-works)

[Dependencies and Setup](#dependencies-and-setup)

[Running](#running)

[Building and Deployment](#building-and-deployment)

[Questionnaire](#questionnaire)

## Purpose and Extensibility
[Top](#coinpicker)

CoinPicker will compare the buy and sell prices of Ethereum and Bitcoin on two exchanges: Kraken and Gemini. CoinPicker will also detail on which exchange a specific cryptocurrency should be purchased.

A live version can be seen here: https://chainalysis-takehome.web.app/

CoinPicker was designed to be easily extensible; adding more cryptocurrencies and exchanges shouldn't be too difficult, and would be done in `backend/main.go`, so long as the desired exchange has a public API and you know the address of its endpoint and the schema of its response.

## How It Works
[Top](#coinpicker)

To answer a HTTP request, the backend fetches from a list of API's and transforms the retrieved data so that a uniform schema is followed. It fetches by cryptocurrency, meaning that if you fetch "BTC", you fetch from all exchanges listed.

During the aforementioned data transform, the lowest buy price and highest sell price (lowest ask and highest bid) between all exchanges is determined as exchange's data is fetched; this is done with min/max variables and forgoes any kind of sorting or search to determine this. 

The frontend fetches from the backend and parses the results into `CoinCard` components which contain `Exchange` components, displaying the current prices.

## Dependencies and Setup
[Top](#coinpicker)

For development, you'll need:
- Node
- React
- Go

For deployment:
- Firebase (React frontend hosting)
- Cloud Platform (GCP) (Go backend hosting)

A single firebase project is used and shared across Firebase and GCP for CoinPicker.

## Running
[Top](#coinpicker)

- Run `npm install` to install all Node modules
- Run `make run` to run both the frontend and backend servers concurrently

## Building and Deployment
[Top](#coinpicker)

### Standard Building and Deployment
- Run `make build`, then `make deploy`

### First-time Building and Deployment
- Install firebase tools with `npm install -g firebase-tools`
    - If you've just installed Firebase tools, you'll need to set that up, follow the instructions here: https://firebase.google.com/docs/hosting/quickstart
- Install `gcloud` by downloading the installers and follow the instructions here: https://cloud.google.com/sdk/docs/install
    - Make sure you allow the appropriate permissions in your GCP console (Cloud Run and Cloud Build).

Both the frontend and backend of this project rely on environment variables.

The frontend's required variable depends on the backend's address after being deploy and vice versa, so the first deploy will require a little back and forth.

- Frontend
    - Create `.env.production` (like `.env.development`), which should contain the `REACT_APP_BACKEND` variable set to the address of your deployed Go application (which you will get later)

- Backend
    - Create and environment variable in Google Cloud Run console, under "Edit & Deploy New Revision" > "Variables & Secrets", called `FRONTEND` and assign it the value of your deployed React app (which you will also get later)

Now for building:

- Run `make build` to build the react and go deliverables
- Run `make deploy-frontend` to deploy to Firebase hosting
    - You will get the address of your now deployed React app; this will be the `FRONTEND` variable you set in the Cloud Run console 
- Run `make deploy-backend` to deploy to Cloud Run. This is like running `make deploy-frontend`; you will now get the url of your backend, which you will copy into a new file `.env.production`, which should look like `.env.development`
- Now go into the Cloud Run console and and set the `FRONTEND` variable
- Lastly, run `make build-frontend` and `make deploy-frontend`

## Questionnaire
[Top](#coinpicker)

1. **Are there any sub-optimal choices( or short cuts taken due to limited time ) in your implementation?**  

I would have liked to have implemented an auto-update on the frontend to continuously fetch data from the API's, which would be limited by the lowest rate limit amongst them. On the backend I would have queried the metadata endpoints of the API's and determined the lowest rate limit, and on the frontend, fetch data with a `setInterval` using this value.

2. **Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)** 

I wrote this program as if it were to scale to allow for more exchanges and cryptocurrencies, but in reality I think if the concern were really only two currencies and two exchanges, a backend would not really have been necessary, which I might consider the over-designed part of this project. Fetching from two endpoints and transforming the retrieved data would have been faster to write in JavaScript, although it may have been slower computationally. Go is very fast which is why I chose it over Python (my other backend language of choice), but the way you are meant to handle JSON with structs felt a little difficult versus the way JavaScript unmarshals it all for you.

3. **If you have to scale your solution to 100 users/second traffic what changes would you make, if any?**

I would implement some kind of caching: currently, in my program you can update the prices for a single currency, which fetches all exchanges, but sometimes the prices for a single exchange does not move. It would make sense to check for any change (perhaps a timestamp on my backend, from the API or even the user's `localStorage`) and only fetch on change. This would make finding the best prices a task better suited to the frontend; a sorted list of the prices would do well I think, making only the first load a little long.

4. **What are some other enhancements you would have made, if you had more time to do this implementation**

Aside from auto-update of prices, it would be nice for the user if they could add/remove currencies and exchanges from the list. For this feature to work without some kind of authentication, this would mean a kind of hide/show feature (which could still be labeled add/remove) for the currencies/exchanges. The frontend would then only fetch from toggled currencies/exchanges (via the backend), and use `localStorage` to record what is enabled/disabled. This would, however, increase the maximum workload of the program: if a user wants all currencies and all exchanges, there would be that many requests to make on the backend.