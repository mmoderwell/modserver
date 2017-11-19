const relay_controller = require('../controllers/relay_controller.js');

module.exports = (app) => {
	app.get('/api/hello', relay_controller.hello);
	app.get('/api/relay/status', relay_controller.status);
	app.get('/api/relay/:name/:action', relay_controller.toggle);
}