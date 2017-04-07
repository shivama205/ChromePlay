exports.init = function(server, db) {
	server.events.on("app:created", function(app) {		
		app.post("/getSongs", function(req, res) {
			var options = req.body;
			db.getSongIDs(options, function(songsOptions) {	
				var songsResponse = {
					status: songsOptions.status,
					message: songsOptions.message
				};

				if (songsOptions.success) {
					var songList = JSON.parse(songsOptions.data);
					var songs = [];
					for(var i=0; i<songList.length; i++) {
						var song = songList[i].songID;
						songs.push(song);
					};
					db.getSongURLS(songs, function (songsData) {
						songsResponse = {
							status: songsData.status,
							message: songsData.message
						};
						if(songsData.success) {
							var songsDataArray = JSON.parse(songsData.data);
							var songDetailList = [];
							for(var i=0;i<songsDataArray.length;i++) {
								songDetailList.push({
									songID: songsDataArray[i]._id,
									url: songsDataArray[i].songURL,
									name: songsDataArray[i].name,
									length: songsDataArray[i].length,
									track: songsDataArray[i].track
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