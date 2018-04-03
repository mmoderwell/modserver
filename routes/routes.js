const relay_controller = require('../controllers/relay_controller.js');
const sensor_controller = require('../controllers/sensor_controller.js');

module.exports = (app) => {
	//backend
	app.get('/api/hello', relay_controller.hello);
	app.get('/api/relay/status', relay_controller.status);
	app.get('/api/relay/:name/:action', relay_controller.toggle);
	app.post('/api/sensor/lookup', sensor_controller.lookup);
	//frontend
	app.get('/', (req, res) => {
		res.render('../views/index.ejs');
	});
};