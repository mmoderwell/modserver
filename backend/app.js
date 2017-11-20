const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://10.0.0.228/modserver')
	.then(() => console.log('Connected to modserver database.'));

routes(app);

module.exports = app;