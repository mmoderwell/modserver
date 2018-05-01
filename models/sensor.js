const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sensorSchema = new Schema({
	value: Number,
	time: { type: Date, default: Date.now, },
});

const sensor = mongoose.model('sensor', sensorSchema);

module.exports = sensor;