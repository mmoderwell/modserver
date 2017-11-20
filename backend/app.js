const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/modserver')
	.then(() => console.log('Connected to modserver database.'));

routes(app);

module.exports = app;