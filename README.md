<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://www.svgrepo.com/show/452445/ear.svg" width="200" alt="Nest Logo" /></a>
</p>

<p style="font-size: 30px; font-weight: bold" align="center">
 EavesDrop
</p>

<p style="font-size: 16px; font-weight: bold" align="center">
Blockchain listener application
</p>


Eaves drop is a node implementation of a blockchain contract/signature listener for evm based blockchains.

This listener can be deployed multiple times to track different contract across different networks. 
The listener is configured as to what contract/network it tracks based on environmental variables.

# Running the application
The application is containerised to be deployed in to production in any number of different ways.
It relies on a server for the node api plus a postgres database.

To run the app locally using docker compose you should run

```bash
$ docker compose up
```

This will use the included compose file to build the image, 
spin up the required infrastructure and run the app on `http://localhost:3000`

## Managing the blacklist
The system has a list of addresses that are ignored from calculations. The blacklist is extended
using a `POST` request to `/blacklist` and posting the correct data:
```json
{
    "address": "some-address"
}
```
This is password protected with basic auth - the credentials are set up as env vars.

> Important: You might want to blacklist 0x0000000000000000000000000000000000000000 depending on your usecase.

### Swagger
When running locally, you can see generated swagger docs at `/swagger`

# Developer instructions
IF you want to extend the application in addition to running it, 
you can get set up with the following instructions:

## Install
We use nvm to ensure the right version of node is used
```bash
$ nvm use 
$ npm install
```

## Developing the app
To run locally to extend the app/add features etc:

```bash
$ npm run start:dev
```
This runs the app with a hot reload, so there is no need to restart the server when you make changes.

> When running the app locally your `.env` file will configure the listener.
Take a look at .env.sample to see all the configurable values.

## Test
The listener has integrations tests that cover the controller and service for the api and service for the listener.
These can be run with:

```bash
$ npm run test
```
