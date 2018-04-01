let status_display = document.getElementById('status');
let numbers = ['one', 'two', 'three', 'four'];

let relay_status = function() {
	let http_req = new XMLHttpRequest();
	http_req.overrideMimeType('application/json');
	http_req.addEventListener("load", res_listen);

	//if there is an error with sending request to server, let user know
	http_req.onerror = () => {
		status_display.innerHTML = 'Unable to connect to server.';
	};

	//send GET request to this route on local Node server
	http_req.open('GET', `/api/relay/status`, true);
	http_req.send(null);
};

relay_status.call();

function res_listen() {

	//response recieved back from Node server
	let response = JSON.parse(this.responseText);

	if (this.status == 200) {
		//if hardware is connected to server
		if (response.success) {
			status_display.innerHTML = 'Connected.';
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
		//if hardware is not connected to server
		else {
			status_display.innerHTML = 'Connected to server. Relays offline.';
		}
	}
}