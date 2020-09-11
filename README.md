# Description

This is an SPA application used to log temperatures between -100 °c and 100 °c as well as get general statitics.

This app was implemented as a NodeJS/Express based API Rest and Angular Material based as web client.   

# Demo

The Static [Demo App](https://andygarcia86.github.io/weather-logging-app/) is based on HTML, CSS, and javascript files. The demo app is a static version of the actual application with the same look and feels and some basic functionalities.

# Requirements:

1. NodeJS v10.15.3: https://nodejs.org/en/download/
2. MongoDB v4.0.9: https://www.mongodb.com/download-center/community
3. Chrome, Firefox or Edge browser 

# Get it running locally:

## Setup and running NodeJS Server App

1. Open a CMD or terminal console
2. Move to project root folder
3. Move to `server` folder. Run `cd server`
4. Run `npm install` command
5. Run `npm install lodash --save`
6. Run `npm run dev` command
7. Open `http://localhost:3000/` to see the Api Rest swagger based documentation in a web browser

## Setup Mongo DB

If the Data base is not created, then the API will create for us the first time it runs. If you open the MongoDB client you will be able to see one database called `weather-logging`.

## Setup and running NodeJS Server App

1. Open a CMD or terminal console
2. Move to `client` folder. Run `cd client`
3. Run `npm install` command
4. Run `npm install -g @angular/cli` command
5. Run `ng serve -o`
6. It will open this URL `http://localhost:4200/` in your default web browser

# Configurations

Just in case you want to run it in a server enviroment, these is what you need to know:

1. Client configuration: Go to `client\src\assets\config\`
2. Server configuration: Go to `server\config.json`
