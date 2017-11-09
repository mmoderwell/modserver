let one = document.getElementById('one');
let two = document.getElementById('two');
let three = document.getElementById('three');
let four = document.getElementById('four');

one.addEventListener('click', api_call);
two.addEventListener('click', api_call);
three.addEventListener('click', api_call);
four.addEventListener('click', api_call);

function api_call(location, name) {
	let action;
	if (this.checked) action = 'on'
	else action = 'off';

	let http_req = new XMLHttpRequest();
	http_req.overrideMimeType('application/json');
	http_req.addEventListener("load", res_listen);
	http_req.onerror = () => this.nextSibling.nextSibling.classList.add('failure');
	http_req.open('GET', `http://localhost:8000/api/lights/${this.id}/${action}`, true);
	//http.setRequestHeader('Content-Type', 'application/json');
	http_req.send(null);
}

function res_listen() {
	let response = JSON.parse(this.responseText);
	let element = document.getElementById(response.name);

	if (this.status == 200) element.nextSibling.nextSibling.classList.add('success')
	else element.nextSibling.nextSibling.classList.add('failure');
}