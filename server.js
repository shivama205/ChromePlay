var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var events = require('events');
var eventEmitter = new events.EventEmitter();

function restartServer(server, app, port) {
	if (server && server.close) {
		server.close();
	}
    create();
	server = exports.server;
	app = exports.app; 
	app.use(bodyParser.json());
	app.use(session({
		name: "plugin",
		secret: "kshfihsdfkshfgiewhrbfkbsdjvksiydreiubfdiuvg",
		resave: true,
		saveUninitialized: true,
		count: 0,	
	}));
	server.listen(port);
	eventEmitter.emit('app:created', app);
}

function restart() {
	restartServer(exports.server, exports.app, 8081);
	var host = exports.server.address().address;
   	var port = exports.server.address().port;
   
   	console.log("Example app listening at http://%s:%s", host, port);
}

function create() {
	var app = exports.app = express();
    var server = exports.server = require('http').createServer(app);

    return server;
}



exports.restart = restart;
exports.events = eventEmitter;
exports.sessionID = null;
exports.uid = null;