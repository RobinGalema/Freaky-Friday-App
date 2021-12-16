require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;

// Check for connection error
db.on('error', (err) => {
    console.error(err);
})

db.once('open', () => {
    console.log("Connected to database");
})

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`[SERVER HAS STARTED] - PORT: ${process.env.PORT}`)
})

// Routes
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter)