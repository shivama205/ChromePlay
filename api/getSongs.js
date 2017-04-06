exports.init = function(server, db) {
	server.events.on("app:created", function(app) {		
		app.post("/getSongs", function(req, res) {
			var options = req.body;
			db.getSongs(options, function(options) {	
				var userData = {
					status: options.status,
					message: options.message
				};

				if (options.success) {
					var array = options.data;
					var songs = [];
					for(var i=0; i<array.length; i++) {
						songs.push({song: array[i].songID});
					}
					userData.data = {
						songs: songs
					};
				}
				res.json(userData);
			})
		});
	});
};