exports.init = function(server, db) {
	server.events.on("app:created", function(app) {
		app.post("/SongPlaylistMap", function(req, res) {
			var options = req.body;
			var signup = db.SongPlaylistMap(options, function(options) {
				var resData = {};
				if (options.success) {
					resData.playlistID = options.playlistID;
					resData.songID = options.songID;									
				} else {
					res.status = 400;
					res.message = "bad request";
				}
				res.json(resData);
			});
		});
	});
};