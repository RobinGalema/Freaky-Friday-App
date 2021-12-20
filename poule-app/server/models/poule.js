const mongoose = require('mongoose');

const pouleSchema = new mongoose.Schema({
    name: { type : String, required: true },
    members: [{
        userId : {type : mongoose.Types.ObjectId, required: true},
        points : {type: Number, default : 0}
    }],
    races: [{
        round : Number,
        name: String,
        completed : {type : Boolean, default : false},
        submission : String
    }]
})

module.exports = mongoose.model('Poule', pouleSchema);