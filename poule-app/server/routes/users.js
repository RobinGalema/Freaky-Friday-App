const express = require('express');
const router = express.Router();
const User = require('../models/user')

// GET ALL
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch(err){
        res.status(500).json({message : err.message})
    }
})

// GET ONE BY NAME
router.get('/auth/:name', async (req, res) => {
    let user;

    try{
        user = await User.findOne({name: req.params.name})

        if (user) {
            res.status(200).json({userId: user._id, userName: user.name, poules: user.poules});
        }
        else res.status(404).json({message: "user not found"})
    } catch(err){
        res.status(500).json({message: err.message});
    }
})

// GET ONE BY ID
router.get('/:id', getUser, (req, res) => {
    res.send({userId: res.user._id, userName: res.user.name});
})

// ADD ONE
router.post('/', (req, res) => {

})

// UPDATE ONE
router.patch('/:id', (req, res) => {

})

// Gets a user's info if it exists by looking for the id in the database
async function getUser(req, res, next){
    let user;

    try{
        user = await User.findById(req.params.id)
        if (user === null){
            return res.status(404).json({message: `Cannot find users with id ${req.params.id}`});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

    res.user = user;
    next();
}

module.exports = router;