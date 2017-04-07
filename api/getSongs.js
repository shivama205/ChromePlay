exports.init = function(server, db) {
	server.events.on("app:created", function(app) {		
		app.post("/getSongs", function(req, res) {
			var options = req.body;
			db.getSongIDs(options, function(options) {	
				var songsResponse = {
					status: options.status,
					message: options.message
				};

				if (options.success) {
					var songList = options.data;
					var songs = [];
					for(var i=0; i<songList.length; i++) {
						var song = songList[i].songID;
						songs.push(song);
					};
					db.getSongURLS(songs, function (songsData) {
						songsResponse = {
							status: options.status,
							message: options.message
						};
						if(songsData.success) {
							var songDetailList = [];
							var songsDataArray = songsData.data;
							for(var i=0;i<songsDataArray.length;i++) {
								songDetailList.push({
									songID: songsDataArray[i]._id,
									url: songsDataArray[i].songURL
								});
							}
							songsResponse.data = {
								songs: songDetailList
							};
						}
						res.json(songsResponse);
					});
				}
			})
		});
	});
};