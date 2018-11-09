### install
clone this repo :

https://github.com/nerkar/server-sync.git

cd into folder 
/server-sync

run

npm i

## how to use
cd into directory

/express-fileupload/example

run

node test.js

## displays

go to 
http://localhost:3000/

> addnew file inside /upload/ directory

it will be reflected in the browser
  
## post handler

view upload.html file for details.
open upload.html,
do a manual file upload. later you can extract post handling endoint and try using CURL

## Database connection server

> modify connection string in var config = {....}

> create table as

create table fileinfo(

filename text)

> run 'dbconnect.js' in another terminal 


>  connection pools are not working so not integrated with test.js
 