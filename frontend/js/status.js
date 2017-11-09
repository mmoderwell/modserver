let relay_status = function() {

	let http_req = new XMLHttpRequest();
	http_req.overrideMimeType('application/json');
	http_req.addEventListener("load", res_listen);

	http_req.onerror = (e) => {
		this.nextSibling.nextSibling.classList.add('failure');
	};

	http_req.open('GET', `http://localhost:8000/api/lights/status`, true);
	//http.setRequestHeader('Content-Type', 'application/json');
	http_req.send(null);
}

relay_status.call();

function res_listen() {

	let response = JSON.parse(this.responseText);
	let element = document.getElementById(response.one);

	if (this.status == 200) {
		console.log('This works');
		let numbers = ['one', 'two', 'three', 'four'];
		for (let i = 0; i < 4; i++) {
			if (response[numbers[i]] == 1) {
				document.getElementById(numbers[i]).checked = true;
			}
		}
	}
}