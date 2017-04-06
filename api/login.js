var dbHelper = require("../utils/dbHelper");

exports.init = function(server) {
	server.events.on("app:created", function(app) {
		app.post("/login", function(req, res) {
			var options = req.body;
			var sid = req.sessionID;
			var dbResult = dbHelper.login(options);
			if (!dbResult.success) {
				var result = {
					message: "AUTH Failed",
					error: dbResult.error
				};
				res.status(401);
				res.json(result);
			} 
		});
	});
};