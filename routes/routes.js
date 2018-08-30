const relay_controller = require('../controllers/relay_controller.js');
const light_controller = require('../controllers/light_controller.js');
const sensor_controller = require('../controllers/sensor_controller.js');
const status_controller = require('../controllers/status_controller.js');
module.exports = (app) => {
	//backend
	app.get('/api/hello', relay_controller.hello);
	app.get('/api/status', status_controller.hardware);
	app.get('/api/database/status', status_controller.database);
	app.get('/api/relay/status', relay_controller.status);
	app.get('/api/relay/:name/:action', relay_controller.toggle);
	app.post('/api/sensor/lookup', sensor_controller.lookup);
	app.get('/api/lights/status', light_controller.status);
	app.get('/api/lights/off', light_controller.off);
	app.get('/api/lights/on', light_controller.on);
	app.get('/api/lights/toggle', light_controller.toggle);
	//frontend
	app.get('/', (req, res) => {
		res.render('../views/index.ejs');
	});
};