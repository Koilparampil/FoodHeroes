const express = require('express');

// Import our modular routers
const ResRouter = require('./res');

const app = express();

app.use('/Res', ResRouter);

module.exports = app;