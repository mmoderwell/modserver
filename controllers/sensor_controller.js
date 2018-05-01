const Sensor = require('../models/sensor');
const http = require('http');

function store(next) {
	const options = {
		hostname: '10.0.0.118',
		port: 80,
		path: '/value',
		method: 'GET',
	};

	//HTTP request to ESP32/8266 hardware
	const http_req = http.request(options, (http_res) => {
		let body = '';
		http_res.setEncoding('utf8');
		http_res.on('data', (chunk) => {
			body += chunk;
		});
		http_res.on('end', () => {
			body = JSON.parse(body);
			const data = new Sensor({ value: body.value, });
			data.save()
				.then(() => { console.log('Sensor data saved.'); })
				.catch(next);
		});
	});
	http_req.on('error', (e) => {
		console.error(`There was a problem with the request: ${e.message}`);
	});
	http_req.end();
}
//store the sensor value once every 30 minutes
setInterval(store, 1800000);

module.exports = {
	hello(req, res) {
		res.send('Hello! Welcome to the sensor controller');
	},
	lookup(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		//recieve request from client, lookup sensor values in time period from database,
		//then send back to client
		const time = req.body;
		Sensor.find({ time: { '$gte': time.start, '$lt': time.end, } })
			.then((list) => {
				var temps = [];
				var times = [];
				var data = [];

				for (let i = 0; i < list.length; i++) {
					temps[i] = list[i].value;
					times[i] = list[i].time;
				}
				for (let i = 0; i < temps.length; i++) {
					data.push({
						x: times[i],
						y: temps[i],
					});
				}
				//send back formatted chart data
				res.send(data);
			});
	},
};