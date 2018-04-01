let one = document.getElementById('one');
let two = document.getElementById('two');
let three = document.getElementById('three');
let four = document.getElementById('four');

one.addEventListener('click', api_call);
two.addEventListener('click', api_call);
three.addEventListener('click', api_call);
four.addEventListener('click', api_call);

function api_call() {
	//read the state of the slider
	let action;
	if (this.checked) {
		action = 'on';
		this.nextSibling.nextSibling.classList.remove('success');
		this.nextSibling.nextSibling.classList.remove('waiting');
	} else {
		action = 'off';
	}

	//disable checkbox so that no more request are made until this finishes
	this.disabled = true;
	this.nextSibling.nextSibling.classList.add('waiting');

	let http_req = new XMLHttpRequest();
	http_req.addEventListener("load", res_listen);

	http_req.onerror = (e) => {
		this.nextSibling.nextSibling.classList.remove('waiting');
		this.nextSibling.nextSibling.classList.add('failure');
	};

	http_req.open('GET', `http://localhost:8000/api/relay/${this.id}/${action}`, true);
	http_req.setRequestHeader("Content-Type", "application/json");
	http_req.send(null);
}

function res_listen() {

	let response = JSON.parse(this.responseText);
	let element = document.getElementById(response.name);

	if (this.status == 200 && response.success) {
		element.nextSibling.nextSibling.classList.remove('waiting');
		element.nextSibling.nextSibling.classList.add('success');
		element.disabled = false;
	} else {
		element.nextSibling.nextSibling.classList.remove('waiting');
		element.nextSibling.nextSibling.classList.add('failure');
		console.log('There was an erorr.');
	}
}