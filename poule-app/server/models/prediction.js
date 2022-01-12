const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    _id : {type: mongoose.ObjectId},
    submissions: [{
        userId :  {type : mongoose.Types.ObjectId, required: true},
        predictions: {type: Array, required: true},
        points: {type: Number}
    }]
})

module.exports = mongoose.model('Prediction', predictionSchema);