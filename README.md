# NodeJS CondorLabs Sergio Llanos
========================

This repo contains a CRUD with NodeJS and with test to the services.

## Instructions to run the proyect
=======================

First run 
  ```
npm install 
  ```
This will create the node_modules directory in your current directory and will download the package to that directory.

Then if you want to run the proyect  
  ```
node server.js
  ```

if you want to run the proyect and automatically restart your server 
  ```
npm run dev
  ```

Finally if you want to execute the test 
  ```
npm run test
  ```
  
  Open to see the list
    ```
 http://localhost:3000/list
   ```
   
  And here is the rest
    ```
 http://localhost:3000/list/Sergio
 http://localhost:3000/saveInfo    To save you just need a name {firstName: Sergio}
 http://localhost:3000/UpdateInfo/Sergio  To update is the same you just need a name {firstName: Sergio}
 http://localhost:3000/updateAllInfo/Sergio
 http://localhost:3000/deleteInfo/Sergio
 http://localhost:3000/deleteAllInfo/Sergio
 
   ```
