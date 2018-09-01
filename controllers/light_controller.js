//cfa7aaaaef31d0c38857a34286c8afdb96455a00ddc8f465f505760f4cc6fcd6
const https = require('https');
module.exports = {
	status(req, res) {
		const options = {
			hostname: 'api.lifx.com',
			port: 443,
			path: '/v1/lights/all',
			method: 'GET',
			headers: {
				Authorization: 'Bearer cfa7aaaaef31d0c38857a34286c8afdb96455a00ddc8f465f505760f4cc6fcd6'
			}
		};
		//HTTP request to LIFX hardware
		const https_req = https.request(options, (https_res) => {
			let body = '';
			//console.log(`Status: ${http_res.statusCode}`);
			//console.log(`Headers: ${JSON.stringify(http_res.headers)}`);
			https_res.setEncoding('utf8');
			https_res.on('data', (chunk) => {
				body = JSON.parse(chunk);
				//console.log(body);
			});
			https_res.on('end', () => {
				//console.log('No more data in response.');
				res.header('Access-Control-Allow-Origin', '*');
				//let return_json = { "name": name, "action": action, "success": true };
				//send client the response from hardware
				res.send(JSON.stringify(body));
			});
		});
		https_req.on('error', (e) => {
			console.error(`There was a problem with the request: ${e.message}`);
			res.header('Access-Control-Allow-Origin', '*');
			let return_json = { 'success': false, };
			//send JSON to client
			res.header('Content-type', 'application/json');
			res.send(return_json);
		});
		https_req.end();
	},
	toggle(req, res) {
		const options = {
			hostname: 'api.lifx.com',
			port: 443,
			path: '/v1/lights/all/toggle',
			method: 'POST',
			headers: {
				Authorization: 'Bearer cfa7aaaaef31d0c38857a34286c8afdb96455a00ddc8f465f505760f4cc6fcd6'
			}
		};
		let data = JSON.stringify({ power: "off" });
		//HTTP request to LIFX hardware
		const https_req = https.request(options, (https_res) => {
			let body = '';
			//console.log(`Status: ${http_res.statusCode}`);
			//console.log(`Headers: ${JSON.stringify(http_res.headers)}`);
			https_res.setEncoding('utf8');
			https_res.on('data', (chunk) => {
				body = JSON.parse(chunk);
				//console.log(body);
			});
			https_res.on('end', () => {
				//console.log('No more data in response.');
				res.header('Access-Control-Allow-Origin', '*');
				//let return_json = { "name": name, "action": action, "success": true };
				//send client the response from hardware
				res.send(JSON.stringify(body));
			});
		});
		https_req.on('error', (e) => {
			console.error(`There was a problem with the request: ${e.message}`);
			res.header('Access-Control-Allow-Origin', '*');
			let return_json = { 'success': false, };
			//send JSON to client
			res.header('Content-type', 'application/json');
			res.send(return_json);
		});
		https_req.write(data);
		https_req.end();
	},
	off(req, res) {
		const options = {
			hostname: 'api.lifx.com',
			port: 443,
			path: '/v1/lights/all/state',
			method: 'PUT',
			headers: {
				Authorization: 'Bearer cfa7aaaaef31d0c38857a34286c8afdb96455a00ddc8f465f505760f4cc6fcd6'
			}
		};
		let data = JSON.stringify({ power: "off" });
		//HTTP request to LIFX hardware
		const https_req = https.request(options, (https_res) => {
			let body = '';
			//console.log(`Status: ${http_res.statusCode}`);
			//console.log(`Headers: ${JSON.stringify(http_res.headers)}`);
			https_res.setEncoding('utf8');
			https_res.on('data', (chunk) => {
				body = JSON.parse(chunk);
				//console.log(body);
			});
			https_res.on('end', () => {
				//console.log('No more data in response.');
				res.header('Access-Control-Allow-Origin', '*');
				//let return_json = { "name": name, "action": action, "success": true };
				//send client the response from hardware
				res.send(JSON.stringify(body));
			});
		});
		https_req.on('error', (e) => {
			console.error(`There was a problem with the request: ${e.message}`);
			res.header('Access-Control-Allow-Origin', '*');
			let return_json = { 'success': false, };
			//send JSON to client
			res.header('Content-type', 'application/json');
			res.send(return_json);
		});
		https_req.write(data);
		https_req.end();
	},
	on(req, res) {
		const options = {
			hostname: 'api.lifx.com',
			port: 443,
			path: '/v1/lights/all/state',
			method: 'PUT',
			headers: {
				Authorization: 'Bearer cfa7aaaaef31d0c38857a34286c8afdb96455a00ddc8f465f505760f4cc6fcd6'
			}
		};
		let data = JSON.stringify({ power: "on" });
		//HTTP request to LIFX hardware
		const https_req = https.request(options, (https_res) => {
			let body = '';
			//console.log(`Status: ${http_res.statusCode}`);
			//console.log(`Headers: ${JSON.stringify(http_res.headers)}`);
			https_res.setEncoding('utf8');
			https_res.on('data', (chunk) => {
				body = JSON.parse(chunk);
				//console.log(body);
			});
			https_res.on('end', () => {
				//console.log('No more data in response.');
				res.header('Access-Control-Allow-Origin', '*');
				//let return_json = { "name": name, "action": action, "success": true };
				//send client the response from hardware
				res.send(JSON.stringify(body));
			});
		});
		https_req.on('error', (e) => {
			console.error(`There was a problem with the request: ${e.message}`);
			res.header('Access-Control-Allow-Origin', '*');
			let return_json = { 'success': false, };
			//send JSON to client
			res.header('Content-type', 'application/json');
			res.send(return_json);
		});
		https_req.write(data);
		https_req.end();
	},
	color_change(req, res) {
		const { selector, hue, saturation, brightness } = req.params;
		const options = {
			hostname: 'api.lifx.com',
			port: 443,
			path: `/v1/lights/${selector}/state`,
			method: 'PUT',
			headers: {
				Authorization: 'Bearer cfa7aaaaef31d0c38857a34286c8afdb96455a00ddc8f465f505760f4cc6fcd6'
			}
		};
		let data = JSON.stringify({
			power: "on",
			color: `hue:${hue} saturation:${saturation/100} brightness:${brightness/100}`,
			brightness: 1.0,
			duration: 2,
		});
		//HTTP request to LIFX hardware
		const https_req = https.request(options, (https_res) => {
			let body = '';
			//console.log(`Status: ${http_res.statusCode}`);
			//console.log(`Headers: ${JSON.stringify(http_res.headers)}`);
			https_res.setEncoding('utf8');
			https_res.on('data', (chunk) => {
				body = JSON.parse(chunk);
				//console.log(body);
			});
			https_res.on('end', () => {
				//console.log('No more data in response.');
				res.header('Access-Control-Allow-Origin', '*');
				//send client the response from lights
				res.send(JSON.stringify(body));
			});
		});
		https_req.on('error', (e) => {
			console.error(`There was a problem with the request: ${e.message}`);
			res.header('Access-Control-Allow-Origin', '*');
			let return_json = { 'success': false, };
			//send JSON to client
			res.header('Content-type', 'application/json');
			res.send(return_json);
		});
		https_req.write(data);
		https_req.end();
	}
}