const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
//connect to database hosted on raspberry pi
mongoose.connect('mongodb://10.0.0.228/modserver')
	.then(() => console.log('Connected to modserver database.'));

app.use(bodyParser.json());
routes(app);

module.exports = app;