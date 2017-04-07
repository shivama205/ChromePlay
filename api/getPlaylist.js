exports.init = function(server, db) {
	server.events.on("app:created", function(app) {
		app.post("/getPlaylist", function(req, res) {
			var options = req.body;
			db.getPlaylist(options, function(playlistOptions) {	
				var playlistData = {
					status: playlistOptions.status,
					message: playlistOptions.message
				};
				if (playlistOptions.success) {
					var playlistArray = JSON.parse(playlistOptions.data);
					var playlists = [];
					for(var i=0; i<playlistArray.length; i++) {
						playlists.push({
							playlistID: playlistArray[i]._id,
							name: playlistArray[i].name
						});
					}
					playlistData.data = {
						playlists: playlists
					};
				}
				res.json(playlistData);
			})
		});
	});
};