const url = require('url');
const express = require("express");
const fs = require('fs');
const { response } = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: `Server authenticated!` });
});

app.get("/login", async (req, res) => {
    const queryObject = url.parse(req.url,true).query;
    const userName = queryObject.userName;

    if (userName){
        checkLogin(userName);
        fs.readFile(path.resolve(__dirname, "./data/users.json"),'utf8', async (err, data) => {
            let response;
            let loginFound = false;
            
            if (err) response = err;
    
            userData = JSON.parse(data);

            await userData.users.forEach(user => {
                if(user.userName === userName){
                    loginFound = true;
                }
            });
            
            res.json({code: 200, message: 'Login Attempted', data: userData, succes: loginFound});
        });
    }else{
        res.json({code: 400, message: 'No username provided'});
    }

})
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const checkLogin = (userName) => {
    return `Hello ${userName}`;
}
