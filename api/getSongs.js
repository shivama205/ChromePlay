exports.init = function(server, db) {
	server.events.on("app:created", function(app) {
		console.log("hello!");
		app.post("/getSongs", function(req, res) {
			var options = req.body;
			console.log("options outside " + JSON.stringify(options));
			db.getSongs(options, function(options) {
				console.log("options inside " + JSON.stringify(options));
				var userData = {				
					status: options.status,
					message: options.message
				};

				if (options.success) {
					var array = options.data;
					console.log("array " + JSON.stringify(array));
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