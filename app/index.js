const express = require('express');

// Import our modular routers
const ResRouter = require('./res');
const AboutRouter = require('./About')

const app = express();

app.use('/Res', ResRouter);
app.use('/About', AboutRouter);
module.exports = app;