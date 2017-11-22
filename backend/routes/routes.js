const relay_controller = require('../controllers/relay_controller.js');
const sensor_controller = require('../controllers/sensor_controller.js');

module.exports = (app) => {
	app.get('/api/hello', relay_controller.hello);
	app.get('/api/relay/status', relay_controller.status);
	app.get('/api/relay/:name/:action', relay_controller.toggle);
	//app.get('/api/sensor/value', sensor_controller.store);
}