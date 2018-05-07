const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

let mongo_uri;
if (process.env.NODE_ENV === 'DEVELOPMENT') {
	mongo_uri = 'mongodb://localhost:27017/modserver';
} else {
	mongo_uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/modserver`;
}
//connect to database hosted on raspberry pi
mongoose.connect(mongo_uri).then(() => console.log('Connected to modserver database.'))
	.catch((e) => {
		console.error('Connection to mongodb failed.');
	});

//the database connection is disconnected
mongoose.connection.on('disconnected', function() {
	console.log('Connection to mongodb is disconnected.');
});

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(bodyParser.json());
routes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'DEVELOPMENT' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error.ejs', { err, });
});

module.exports = app;