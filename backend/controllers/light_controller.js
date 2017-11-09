const http = require('http');

module.exports = {
	hello(req, res) {
		res.send('Hello! Welcome to light controller');
	},
	toggle(req, res) {
		const { name, room, action } = req.params;

		const options = {
			hostname: '10.0.0.208',
			port: 80,
			path: `/${room}/${name}/${action}`,
			method: 'GET',
		};
		const http_req = http.request(options, (http_res) => {
			console.log(`STATUS: ${http_res.statusCode}`);
			console.log(`HEADERS: ${JSON.stringify(http_res.headers)}`);
			http_res.setEncoding('utf8');
			http_res.on('data', (chunk) => {
				console.log(`BODY: ${chunk}`);
			});
			http_res.on('end', () => {
				console.log('No more data in response.');
			});
		});

		http_req.on('error', (e) => {
			console.error(`problem with request: ${e.message}`);
		});
		http_req.end();
		res.header("Access-Control-Allow-Origin", "*");
		res.send(`Turning the ${name} lights in the ${room} ${action}.`);
	}
}