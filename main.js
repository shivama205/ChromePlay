var API = [
	require("./api/login"),
	require("./api/signup"),
	require("./api/getPlaylist"),
	require("./api/getSongs")
];
var server = require("./server");
var db = require("./utils/dbHelper");

for (var i = 0; i < API.length; i++) {
    API[i].init(server, db);
}

server.events.on('app:created', function(app) {
	app.get('/hello', function (req, res) {
		var count = req.session.count;
		req.session.count++;
		var sid = req.sessionID;
		console.log(sid);
		res.send("hello world - " + count);
	});
});

db.connect();
server.restart();