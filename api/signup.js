exports.init = function(server, db) {
	server.events.on("app:created", function(app) {
		app.post("/signup", function(req, res) {
			var options = req.body;
			var signup = db.signup(options, function(options) {
				var resData = {};
				if (options.success) {
					resData.userId = options._id;
				} else {
					res.status = 400;
					res.message = "bad request";
				}
				res.json(resData);
			});
		});
	});
};