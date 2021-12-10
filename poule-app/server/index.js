const url = require('url');
const express = require("express");
const fs = require('fs');
const { response } = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// Api conncection
app.get("/api", (req, res) => {
    res.status(200);
    res.json({ status: 200, message: `Server authenticated!` });
});

// Login
app.get("/login", async (req, res) => {
    const queryObject = url.parse(req.url,true).query;
    const userName = queryObject.userName;

    if (userName){
        checkLogin(userName);
        fs.readFile(path.resolve(__dirname, "./data/users.json"),'utf8', async (err, data) => {
            let response;
            let loginFound = false;
            
            if (err) response = err;
    
            const jsonData = JSON.parse(data);

            // Get the user's data
            await jsonData.users.forEach(user => {
                if(user.userName === userName){
                    loginFound = true;
                    userData = user;
                }
            });
            
            // check if the login is valid
            if (loginFound){
                res.status(200); // OK
                res.json({status: 200, message: 'Login Attempted', data: userData});
            }
            else{
                res.status(401); // UNAUTORIZED
                res.json({status: 401, message:'Login credentials are invalid'})
            }
        });
    }else{
        res.status(400);
        res.json({status: 400, message: 'No username provided'});
    }
})
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const checkLogin = (userName) => {
    return `Hello ${userName}`;
}
