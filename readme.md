This project is js based to connect to sqlite database.
First, be sure that you have installed SQLite
for linux Ubuntu you can follow this
https://linuxhint.com/install-sqlite-ubuntu-linux-mint/

If you want, you can install a db manager like this
http://sqlitebrowser.org/

## Installing packages
After that, please download all dependencies of the project
npm install

## Executing Tests
After packages has been installed, you can run test

## npm test
Be aware that this batch is executed reading package.json file in the section "tests"

## Database
If you moves the sqlite file, you have to modifiy the file ./model/index.js 
in the section storage.

## Logging queries
If you want to check the queries to database you can enable this feature in the ./models.index.js
in the section logging.
