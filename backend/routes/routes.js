const light_controller = require('../controllers/light_controller.js');

module.exports = (app) => {
	app.get('/api/hello', light_controller.hello);
	app.get('/api/lights/:room/:name/:action', light_controller.toggle);
}