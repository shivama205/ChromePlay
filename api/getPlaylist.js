exports.init = function(server, db) {
	server.events.on("app:created", function(app) {
		app.post("/getPlaylist", function(req, res) {
			var options = req.body;
			db.getPlaylist(options, function(options) {	
				var userData = {
					status: options.status,
					message: options.message
				};
				if (options.success) {
					var array = options.data;
					var playlists = [];
					for(var i=0; i<array.length; i++) {
						playlists.push({playlistID: array[i]._id});
					}
					userData.data = {
						playlists: playlists
					};
				}
				res.json(userData);
			})
		});
	});
};