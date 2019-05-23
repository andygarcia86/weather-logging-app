# Description

This is an SPA application used to log temperatures between -100 °c and 100 °c as well as get general statitics.

This app was implemented as a NodeJS/Express based API Rest and Angular Material based web client.   

# Requirements:

1. NodeJS v10.15.3: https://nodejs.org/en/download/  
2. MongoDB v4.0.9: https://www.mongodb.com/download-center/community   
3. Chrome, Firefox or Edge browser 

# Get it running locally:

1. Open a terminal console
2. Move to project root folder
3. Move to "server" folder
4. Run "npm install" command
5. Run "npm run dev"
6. Move to "client" folder
7. Run "npm install" command
8. Run "npm install -g @angular/cli" command
9. Run "ng serve"
10. Open "http://localhost:4200/" in a browser to start playing with the app
11. Open "http://localhost:3000/" to see the Api Rest swagger based documentation

# Configurations

Just in case you want to run it in a server enviroment, these is what you need to know:

1. Client configuration: Go to "client\src\assets\config\"
2. Server configuration: Go to "server\config.json"
