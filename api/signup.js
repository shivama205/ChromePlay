exports.init = function(server, db) {
	server.events.on("app:created", function(app) {
		app.post("/signup", function(req, res) {
			var options = req.body;
			var signup = db.signup(options, function(data) {
				var resData = {};
				if (data.success) {
					resData.userId = data._id;
				} else {
					res.
				}
				res.json(resData);
			});
		});
	});
};