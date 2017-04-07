exports.init = function(server, db) {
	server.events.on("app:created", function(app) {
		app.post("/createPlaylist", function(req, res) {
			var options = req.body;
			var signup = db.createPlaylist(options, function(options) {
				var resData = {};
				if (options.success) {
					resData.playlistID = options._id;
					resData.playlistName = options.name;
					resData.user_id = options.userID;
				} else {
					res.status = 400;
					res.message = "bad request";
				}
				res.json(resData);
			});
		});
	});
};