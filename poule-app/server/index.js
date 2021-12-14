const url = require('url');
const express = require("express");
const fs = require('fs');
const { response, json } = require('express');
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

// Request poules
app.get("/api/poules", async (req, res) => {
    console.log("=====> Starting REQ <=====")
    console.log("[API - POULES]", "New Request @ ", new Date().toTimeString())
    const queryObject = url.parse(req.url,true).query;
    const userName = queryObject.userName;
    const loggedIn = queryObject.loggedIn;
    const specficPoule = queryObject.pouleId;

    if (userName && loggedIn === "true"){
        let pouleIds;

        fs.readFile(path.resolve(__dirname, "./data/users.json"),'utf8', async (err, data) => {
            if (err) return undefined;

            const users = await JSON.parse(data).users;

            const loggedInUser = await users.find(o => o.userName === userName);
            pouleIds = loggedInUser.poules;

            fs.readFile(path.resolve(__dirname, "./data/poules.json"),'utf8', async (err, data) => {
                if (err) return undefined;
    
                const poules = await JSON.parse(data).poules;
                let result;

                if (specficPoule != undefined){
                    console.log("specific poule requested");
                    result = await poules.find(o => o.id === parseInt(specficPoule));

                    // Send a response
                    if (result === undefined){
                        res.status(404);
                        res.json({status: 404, message: "This poule does not exist"});
                    }
                    else{
                        console.log("[API - POULES]", "GET succesfull, sending data", result)
                        res.status(200);
                        res.json({status: 200, message:"Succes", data: result});
                    }
                }
                else {
                    let result = [];
    
                    await pouleIds.forEach(pouleId => {
                        result.push(poules.find(o => o.id === pouleId));
                    })
                    
                    // Send a response
                    console.log("[API - POULES]", "GET succesfull, sending data", result)
                    res.status(200);
                    res.json({status: 200, message:"Succes", data: result});
                }
            });
        });
    }
    else if (loggedIn != "true"){
        res.status(401);
        res.json({status: 401, message: 'Unauthorized'})
    }
    else {
        res.status(400)
        res.json({status: 400, message: 'Bad Request'})
    }
    console.log("====> Ending REQ <====");
})

  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const checkLogin = (userName) => {
    return `Hello ${userName}`;
}
