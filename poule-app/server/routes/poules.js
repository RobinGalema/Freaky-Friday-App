const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Poule = require('../models/poule')


// GET ALL
router.get('/', async (req, res) => {
    try {
        const poules = await Poule.find();
        res.json(poules)
    } catch(err){
        res.status(500).json({message : err.message})
    }
})

// Getting all poules of a specific user by id
router.get('/userpoules?:id', async (req, res) => {
    let poules;
    let id = mongoose.Types.ObjectId(req.query.id)
    console.log(id);

    try{
        poules = await Poule.find({members: {$elemMatch: {userId: id}}}, {_id: 1, name: 1,})

        if (poules) {
            console.log(poules)
            res.status(200).json(poules);
        }
        else{
            res.status(404).json({message: "No poules found for this user"})
        }
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router;