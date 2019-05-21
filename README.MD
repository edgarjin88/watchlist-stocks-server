

# Project #2: Stock Watch List (Back-End)
This is our mobile friendly project using React and Node.js.

Authors:
* [Monica](https://github.com/monicamendesmontanha)
* [Luke](https://github.com/LukeAnton)
* [Michael](https://github.com/Michaelfov)
* [Jin](https://github.com/edgarjin88)




### If you don't have Mysql installed, please go through the following setps. 

1. Download and instll MySQL at https://www.mysql.com/

2. Download and install Workbench https://www.mysql.com/products/workbench/

3. Also please install Sequelize-cli globally. please refer here https://www.npmjs.com/package/sequelize-cli/v/5.4.0


### For Initial setup for Whatch-list server, please follow the next steps

1. Click the link or clone the this github page. 
2. Move to the directory that you are ging to use and "npm install"



## General Features of Backend 

1. Security
Following features are implemented at the backend::

* API key protection
* JWT Token
* Passport modules 

2. Store user information and favorite stock list. 
* This backend server was designed to serve as an API server to support front-end React server.
* Cross origin issues are solved by usign CORS module. 


3. Database
* Sequelize(SQL) was used for database. 
* Currently Most of the data tables are not in use. 



## Things to improve

1. General refactoring
* Code to be cleaned up.
* In many places, "promise" and "await" used interchangeably. Better to use one style for better readability
* There are unnecessary code lines that were used for testing such as front and pages. They all needs to be cleaned up. 

2. Remove unused function 
* API key and JWT token is not currently used by front end, but still in the backend. 

3. Deployment issue. 
* Currently showing some issues on "HEROKU" environment. 



## Skils gained through this team project
1. User authentication ans protection through JWT token, Passport module, bcrypt, Sequelize
2. Asynchronouse data transfer and routing on Express framework 
3. RESTful api and communication between front-end server and bac-end server. 
4. Solid git-hub knowledge managing conflits of code throughout the projects. 
5. Teamwork and pair-programming skilss 


[Link to live](https://monicamendesmontanha.github.io/watchlist-stocks-client)


---
Authors:
* [Monica](https://github.com/monicamendesmontanha)
* [Luke](https://github.com/LukeAnton)
* [Michael](https://github.com/Michaelfov)
* [Jin](https://github.com/edgarjin88)


## Technologies

* React
* Node.js
---

Task tracker:
- [x] [Trello - Frontend](https://trello.com/b/DO7AKhNq/watchlist-stocks-frontend)
- [x] [Trello - Backend](https://trello.com/b/TlYUzceT/watchlist-stocks-backend)
