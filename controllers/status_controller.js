const Sensor = require('../models/sensor');
const http = require('http');
const ping = require('ping');

require('../app.js'); // which executes 'mongoose.connect()'
const mongoose = require('mongoose');

module.exports = {
	hello(req, res) {
		res.send('This controller will get the status of each part of Modserver.');
	},
	hardware(req, res) {
		let results = [];
		let hosts = [
			{ 'name': 'relays', 'hostname': '10.0.0.208', 'alive': 'f', },
			{ 'name': 'temperature', 'hostname': '10.0.0.118', 'alive': 'f', },
		];
		//makes an array of promises to be resolved
		let pings = hosts.map((host) => {
			return ping.promise.probe(host.hostname);
		});
		//the results of all the pings to the hosts
		let response = Promise.all(pings);
		response.then(data => {
			data.forEach((host) => {
				results.push({ 'hostname': host.host, 'alive': host.alive, });
			});
			res.send(results);
		});

	},
	database(req, res) {
		// sends a 1 or a 0
		res.send({ "connected": mongoose.connection.readyState });
	}
};