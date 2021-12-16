const express = require('express');
const router = express.Router();
const user = require('../models/user')

// GET ALL
router.get('/', async (req, res) => {
    try {
        const users = await user.find();
        res.json(users)
    } catch(err){
        res.status(500).json({message : err.message})
    }
})

// GET ONE BY NAME
router.get('/auth/:name', (req, res) => {
    res.send(req.params.name)
})

// GET ONE BY ID
router.get('/:id', (req, res) => {

})

// ADD ONE
router.post('/', (req, res) => {

})

// UPDATE ONE
router.patch('/:id', (req, res) => {

})

module.exports = router;