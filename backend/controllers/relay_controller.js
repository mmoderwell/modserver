const http = require('http');

module.exports = {
	hello(req, res) {
		res.send('Hello! Welcome to the relay controller');
	},
	status(req, res) {

		const options = {
			hostname: '10.0.0.208',
			port: 80,
			path: `/status`,
			method: 'GET',
		};

		//HTTP request to ESP32/8266 hardware
		const http_req = http.request(options, (http_res) => {
			let body;
			//console.log(`Status: ${http_res.statusCode}`);
			//console.log(`Headers: ${JSON.stringify(http_res.headers)}`);
			http_res.setEncoding('utf8');
			http_res.on('data', (chunk) => {
				body = JSON.parse(chunk);
				console.log(body);
			});
			http_res.on('end', () => {
				console.log('No more data in response.');
				res.header("Access-Control-Allow-Origin", "*");
				//let return_json = { "name": name, "action": action, "success": true };
				//send client the response from hardware
				res.send(JSON.stringify(body));
			});
		});

		http_req.on('error', (e) => {
			console.error(`There was a problem with the request: ${e.message}`);
			res.header("Access-Control-Allow-Origin", "*");
			let return_json = { "success": false };

			//send JSON to client
			res.send(return_json);
		});
		http_req.end();
	},
	toggle(req, res) {
		const { name, action } = req.params;

		const options = {
			hostname: '10.0.0.208',
			port: 80,
			path: `/${name}/${action}`,
			method: 'GET',
		};
		const http_req = http.request(options, (http_res) => {
			//console.log(`Status: ${http_res.statusCode}`);
			//console.log(`Headers: ${JSON.stringify(http_res.headers)}`);
			http_res.setEncoding('utf8');
			http_res.on('data', (chunk) => {
				let body = JSON.parse(chunk);
				const status = ['off', 'on'];
				console.log(`Relay ${name} is now ${status[body[name]]}.`);
			});
			http_res.on('end', () => {
				console.log('No more data in response.');
				res.header("Access-Control-Allow-Origin", "*");
				let return_json = { "name": name, "action": action, "success": true };
				//send JSON to client
				res.send(JSON.stringify(return_json));
			});
		});

		http_req.on('error', (e) => {
			console.error(`There was a problem with the request: ${e.message}`);
			res.header("Access-Control-Allow-Origin", "*");
			let return_json = { "name": name, "action": action, "success": false };
			//send JSON to client
			res.send(return_json);
		});
		http_req.end();
	}
};