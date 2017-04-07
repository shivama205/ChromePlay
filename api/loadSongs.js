exports.init = function(server, db) {
	server.events.on("app:created", function(app) {
		app.post("/loadSong", function(req, res) {
			var options = req.body;
			var signup = db.loadSong(options, function(options) {
				var resData = {};
				if (options.success) {
					resData.track = options.track;
					resData.songName = options.name;
					resData.songlength = options.length;
					resData.file = options.songURL;
				} else {
					res.status = 400;
					res.message = "bad request";
				}
				res.json(resData);
			});
		});
	});
};