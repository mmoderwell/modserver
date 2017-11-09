const http = require('http');

module.exports = {
	hello(req, res) {
		res.send('Hello! Welcome to light controller');
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
				let return_json = { "name": name, "action": action }
				res.send(JSON.stringify(return_json));
			});
		});

		http_req.on('error', (e) => {
			console.error(`There was a problem with that request: ${e.message}`);
		});
		http_req.end();

	}
}