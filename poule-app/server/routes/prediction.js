const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Poule = require('../models/poule')
const User = require('../models/user')
const Prediction = require('../models/prediction');

// Get predictions by prediction id
router.get('/:id', async (req, res) => {
    try{
        let id = mongoose.Types.ObjectId(req.params.id)
        console.log(id);
        const prediction = await Prediction.findOne({_id: id});

        res.status(200).json({data: prediction});

    }catch(err){
        res.status(500).json({message: err.message});
    }
})

router.post('/', async (req, res) => {
    const body = req.body;

    let poule; // The poule 
    let predictionExists; // Does a prediction already exist for this poule

    try{
        // Check if a prediction for this round and poule already exists
        poule = await Poule.findOne({_id: mongoose.Types.ObjectId(body.poule)}, {races: 1});

        (await poule.races.find((x) => x.round === body.round) != undefined) ? predictionExists = true : predictionExists = false;
    }
    catch(err){
        res.status(500).json({message: err.message, at: "Getting poule information"});
    }
    
    console.log(predictionExists);
    // Do something based on the check
    if (predictionExists){
        // Prediction does already exist, check if user already has a prediction
        const submissionId = poule.races[body.round-1].submission;
        let canSubmit;

        try{
            let submission = await Prediction.findById(submissionId);

            console.log(submission);
            submission.submissions.find((x) => x.userId.toString() === body.userId) ? canSubmit = false : canSubmit = true;
        }
        catch(err){
            res.status(500).json({message: err.message, at: "Getting submission information"});
        }

        if (canSubmit){
            // submit the data
            let newSubmission = {
                userId : body.userId,
                predictions: body.prediction
            }

            try{
                let prediction = await Prediction.findOneAndUpdate({_id: mongoose.Types.ObjectId(submissionId)}, {$push: {submissions: newSubmission}})
                res.status(201).json({message: "Succes", data: newSubmission})
            }
            catch(err){
                res.status(500).json({message: err.message, at: "Adding prediction to submission"});
            }
        }
        else{
            // user has already submitted
            res.status(409).json({message: "This user already has a prediction"})
        }
    }
    else{
        // Prediction does not exist, make a new one
        const newId = mongoose.Types.ObjectId()

        newPrediction = new Prediction({
            _id: newId,
            submissions : [{
                userId : body.userId,
                predictions: body.prediction
            }]
        });

        let prediction;

        // Make a new prediction
        try{
            prediction = await newPrediction.save();
        }
        catch(err){
            res.status(500).json({message: err.message, at: "Creating a new prediction"});
        }

        console.log(newId);

        // Create a new race object on the poule
        let newRace = {
            round: body.round,
            name: body.name,
            submission: newId
        }

        console.log(newRace.prediction);

        // Add the prediction as a new race to the array of races
        try {
            const updatedPoule = await Poule.findOneAndUpdate({_id: mongoose.Types.ObjectId(body.poule)}, {$push: {races: newRace}});
            res.status(201).json({message: "Succesfully created a new prediction for the poule" , data: updatedPoule, success: true});
        }
        catch (err){
            res.status(500).json({message: err.message, at: "Adding new prediction to poule"})
        }
    }
})

module.exports = router;