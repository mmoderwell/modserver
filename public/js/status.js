let relay_display = document.getElementById('relay_status');
let temp_display = document.getElementById('temp_status');
let numbers = ['one', 'two', 'three', 'four', ];
let database = false;

let relay_status = function() {
	let http_req = new XMLHttpRequest();
	http_req.overrideMimeType('application/json');
	http_req.addEventListener('load', res_listen);

	//if there is an error with sending request to server, let user know
	http_req.onerror = () => {
		relay_display.innerHTML = 'Unable to connect to server.';
	};

	//send GET request to this route on Node server
	http_req.open('GET', '/api/relay/status', true);
	http_req.send(null);

	function res_listen() {
		//response recieved back from Node server
		let response = JSON.parse(this.responseText);
		console.log(response);
		//will always be connected to Node server since page is now served from same server
		if (this.status == 200) {
			//hardware is connected to server
			if (response.success) {
				relay_display.innerHTML = 'Connected.';
				document.querySelector('.box').classList.remove('no_connection');

				for (let i = 0; i < 4; i++) {
					//enable the sliders since everything is connected
					document.getElementById(numbers[i]).disabled = false;
					// check the slider if the relay is on
					if (response[numbers[i]] == 1) {
						document.getElementById(numbers[i]).checked = true;
					}
				}
			}
			//hardware is not connected to Node server
			else {
				relay_display.innerHTML = 'Connected to server. Relays offline.';
			}
		} else {
			console.log(this.responseText);
		}
	}
};

let hardware_status = function() {
	let http_req = new XMLHttpRequest();
	http_req.overrideMimeType('application/json');
	http_req.addEventListener('load', res_listen);

	//if there is an error with sending request to server, let user know
	http_req.onerror = () => {
		relay_display.innerHTML = 'Unable to connect to server.';
	};

	//send GET request to this route on Node server
	http_req.open('GET', '/api/status', true);
	http_req.send(null);

	function res_listen() {
		//response recieved back from Node server
		let devices = JSON.parse(this.responseText);
		devices.forEach((device) => {
			if (device.hostname == '10.0.0.208' && device.alive) {
				relay_status.call();
			} else {
				relay_display.innerHTML = 'Connected to server. Relays offline.';
			}
		});
	}
};

let db_status = function() {
	let http_req = new XMLHttpRequest();
	http_req.overrideMimeType('application/json');
	http_req.addEventListener('load', res_listen);

	//if there is an error with sending request to server, let user know
	http_req.onerror = () => {
		relay_display.innerHTML = 'Unable to connect to server.';
	};

	//send GET request to this route on Node server
	http_req.open('GET', '/api/database/status', true);
	http_req.send(null);

	function res_listen() {

		//response recieved back from Node server
		let response = JSON.parse(this.responseText);
		//console.log(response);
		//will always be connected to Node server since page is now served from same server
		if (this.status == 200) {
			//hardware is connected to server
			if (response.connected === 1) {
				database = true;
				temp_display.innerHTML = 'Connected to database.';
				//document.querySelector('.box').classList.remove('no_connection');
			}
			//Database is not connected to Node server
			else {
				temp_display.innerHTML = 'Database offline.';
			}
		}
	}
};

hardware_status.call();
db_status.call();