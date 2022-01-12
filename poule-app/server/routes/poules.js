const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Poule = require('../models/poule')
const User = require('../models/user')


// GET ALL
router.get('/', async (req, res) => {
    try {
        const poules = await Poule.find();
        res.json(poules)
    } catch(err){
        res.status(500).json({message : err.message})
    }
})

// Get one by ID
router.get('/poule?:id', async (req, res) => {
    let poule;
    let id =  mongoose.Types.ObjectId(req.query.id);

    try{
        poule = await Poule.findById(id);

        res.status(200).json({message: "Succes", data: poule});
    }
    catch(err){
        res.status(500).json({message: err.message})
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

// Add a new poule to the database
router.post('/', async (req, res) => {
    const body = req.body;

    const poule = new Poule({
        name: body.name,
        members: [{
            userId : body.user,
            points : 0
        }],
        races: []
    });

    try{
        const newPoule = await poule.save();
        res.status(201).json({message: "Poule created succesfully", succes: true, poule: newPoule});
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
})

// Add a member to the poule
router.post('/add', async (req, res) => {
    let id;

    try{
        id = await User.findOne({name: req.body.name});
        let updatedPoule;

        if (id){
            member = {
                userId: id,
                points: 0
            }

            try{
                let updatedPoule = await Poule.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.poule)}, {$push: {members: member}});
                res.status(200).json({message: "succes", data: updatedPoule, succes: true});
            }
            catch(err){
                res.status(500).json({message: err.message, succes: false});
            }
        }
        else{
            res.status(404).json({message: 'User not found', succes: false})
        }
    }
    catch (err) {
        res.status(500).json({message: err.message, succes: false});
    }
})

module.exports = router;