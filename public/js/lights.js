let color_light = document.getElementById('color');
let color_light_status = document.getElementById('color_light_status');
let white_light = document.getElementById('white');
let white_light_status = document.getElementById('white_light_status');
//updates UI light color from slider value
function setHSB() {
	let hue = document.querySelector('.color .hue input').value;
	let saturation = document.querySelector('.color .saturation input').value;
	let brightness = document.querySelector('.color .brightness input').value;
	let color = `hsl( ${hue},${saturation}%,${brightness}%)`;
	color_light.style.color = color;
	document.getElementById('c_hue').innerHTML = `h: ${('000' + hue).substr(-3)}`;
	document.getElementById('c_sat').innerHTML = `s: ${(Math.round( (saturation/100) * 10 ) / 10).toFixed(1)}`;
	document.getElementById('c_bright').innerHTML = `b: ${(Math.round( (brightness/100) * 10 ) / 10).toFixed(1)}`;
}
setHSB();
color_light.addEventListener('click', change_state);

function setB() {
	let brightness = document.querySelector('.white .brightness input').value;
	let color = `hsl(60,60%,${brightness}%)`;
	white_light.style.color = color;
	//ensures the numbers always have 3 digits, for asthetic purposes
	document.getElementById('w_bright').innerHTML = `b: ${(Math.round( (brightness/100) * 10 ) / 10).toFixed(1)}`;
}
setB();
white_light.addEventListener('click', change_state);

function change_state() {
	const light = this.id;
	let hue, saturation, brightness;
	if (light == 'color') {
		hue = document.querySelector(`.color .hue input`).value;
		saturation = document.querySelector('.color .saturation input').value;
		brightness = document.querySelector('.color .brightness input').value;
	} else {
		brightness = document.querySelector('.white .brightness input').value;
	}
	let route;
	let http_req = new XMLHttpRequest();
	http_req.addEventListener('load', res_listen);
	http_req.onerror = (e) => {};
	if (brightness == 0) {
		route = '/api/lights/all/off';
	} else {
		route = `/api/lights/all/color/${hue}/${saturation}/${brightness}`;
	}
	http_req.open('GET', route, true);
	http_req.setRequestHeader('Content-Type', 'application/json');
	http_req.send(null);

	function res_listen() {
		let response = JSON.parse(this.responseText);
		//console.log(response);
		//color_light_status.innerHTML = 'Updated.'
	}
}