exports.init = function(server, db) {
	server.events.on("app:created", function(app) {
		app.post("/login", function(req, res) {
			var options = req.body;
			db.login(options, function(options) {
				var userData = {
					status: options.status,
					message: options.message
				};
				if (options.success) {
					userData.data = {
						userID: options.data._id
					};
				} 
				res.json(userData);
			});
		});
	});
};