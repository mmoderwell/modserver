let status_display = document.getElementById('status');
let numbers = ['one', 'two', 'three', 'four'];

let relay_status = function() {
	let http_req = new XMLHttpRequest();
	http_req.overrideMimeType('application/json');
	http_req.addEventListener("load", res_listen);

	http_req.onerror = () => {
		//this.nextSibling.nextSibling.classList.add('failure');
		status_display.innerHTML = 'Unable to connect to server.';
		for (let i = 0; i < 4; i++) {
			document.getElementById(numbers[i]).disabled = true;
		}
	};

	http_req.open('GET', `http://localhost:8000/api/relay/status`, true);
	//http.setRequestHeader('Content-Type', 'application/json');
	http_req.send(null);
}

relay_status.call();

function res_listen() {

	let response = JSON.parse(this.responseText);
	let element = document.getElementById(response.one);

	if (this.status == 200) {
		if (response.success) {
			status_display.innerHTML = 'Connected.';
			document.querySelector('.box').classList.remove('no_connection');
			for (let i = 0; i < 4; i++) {
				document.getElementById(numbers[i]).disabled = false;
				if (response[numbers[i]] == 1) {
					document.getElementById(numbers[i]).checked = true;
				}
			}
		} else {
			status_display.innerHTML = 'Connected to server. Hardware offline.';
			for (let i = 0; i < 4; i++) {
				document.getElementById(numbers[i]).disabled = true;
			}
		}
	}
}