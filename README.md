# Events-Manager

## Configuration

Change path to project root folder `./events-app`
Install all the dependencies
### `npm install`

This project uses, json-server for local db. Which allows developers to use .json files as a local database. To perfurm CRUD Operations.

`./events-app/src/db.json` is the json file used as localDB for this project.

## Run json server

Run json-server in the specified port `2222`.
### `json-server --watch db.json --port 2222`
If port is already in used and want to change it:

First change the port in the url's specified in `./events-app/src/constants.constants.js` file.

If not project might not work as intended, and erroneous.

## Run Project
### `npm start`
Execute the command from `./events-app` directory. 