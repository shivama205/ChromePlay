exports.init = function(server, db) {
	server.events.on("app:created", function(app) {
		app.post("/login", function(req, res) {
			var options = req.body;
			db.login(options, function(userOptions) {
				var userData = {
					status: userOptions.status,
					message: userOptions.message
				};
				if (userOptions.success) {
					var userInfo = JSON.parse(userOptions.data);
					userData.data = {
						userID: userInfo._id
					};
				} 
				res.json(userData);
			});
		});
	});
};