let one = document.getElementById('one');
let two = document.getElementById('two');
let three = document.getElementById('three');
let four = document.getElementById('four');

one.addEventListener('click', apiCall);
two.addEventListener('click', apiCall);
three.addEventListener('click', apiCall);
four.addEventListener('click', apiCall);

function apiCall(location, name) {
	let action;
	if (this.checked) {
		action = 'on'
	} else {
		action = 'off';
	}
	let http = new XMLHttpRequest();
	http.overrideMimeType('application/json');
	http.addEventListener("load", res_listen);
	http.open('GET', `http://localhost:8000/api/lights/bedroom/${this.id}/${action}`, true);
	//http.setRequestHeader('Content-Type', 'application/json');
	http.send(null);
}

function res_listen() {
	console.log(this.responseText);
}