module.exports = {
	hello(req, res) {
		res.send('Hello! Welcome to light controller');
	},
	toggle(req, res) {
		const { name } = req.params;
		res.send(`Toggling ${name} lights.`);
	}
}