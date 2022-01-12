require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;

// Check for connection error
db.on('error', (err) => {
    console.error(err);
})

db.once('open', () => {
    console.log("Connected to database");
})

app.listen(process.env.PORT, () => {
    console.log(`[SERVER HAS STARTED] - PORT: ${process.env.PORT}`)
})

app.get('/api', (req, res) => {
    res.status(200).json({message: "Connected to the server", connected: true})
})

// Routes
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter)

const poulesRouter = require('./routes/poules');
app.use('/api/poules', poulesRouter)

const predictionRouter = require('./routes/prediction');
app.use('/api/prediction', predictionRouter);