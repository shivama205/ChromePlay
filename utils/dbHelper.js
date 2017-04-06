var mongoose = require('mongoose');
var mongodb = require('mongodb');

var Schema = mongoose.Schema;
var Model = mongoose.model.bind(mongoose);
var models = {};
var db;

function initHelper() {
	initUser();
	initPlaylist();
}

function initUser () {
	var schema = new Schema ({
		username: String,
		password: String,
	});
	var model = Model('users', schema);
	models.userModel = model;
}

function initPlaylist () {
	var schema = new Schema ({
		userID: String
	});
	var model = Model('playlists', schema);
	models.playlistModel = model;
}

exports.getPlaylist = function (options, cb) {
	var model = models.playlistModel;
	var requestObj = {
		userID: options.userID
	};
	model.find(requestObj, '_id', function(err, docs) {
		if (err) {
			console.log(err);
			cb({
				status: 301,
				success: false,
				message: "database failure" + err
			});
		} else if (!docs) {
			cb({
				status: 400,
				success: false,
				message: "no playlist found"
			});
		} else {
			cb({
				status: 200,
				message: "OK",
				success: true,
				data: docs
			});
		}
	});
};

exports.login = function (options, cb) {
	var model = models.userModel;
	model.findOne(options, function(err, user) {
		if (err) {
			cb({
				status: 301,
				success: false,
				message: "database failure" + err
			});
		} else if (!user){
			cb({
				status: 400,
				success: false,
				message: "invalid username or password"
			});
		} else {
			cb({
				status: 200,
				success: true,
				message: "OK",
				data: user
			});
		}
	});
};

exports.signup = function (options, cb) {
	var user = new models.userModel(options);
	var savedUser;
	user.save(function (err, user) {
		if (err) {
			console.log("save failed");
			console.log(err);
			cb({
				success: false,
				error: err,
			});
		} else {
			user.success = true;
			cb(user);
		}
	});
	return savedUser;
}

exports.connect = function () {
	mongoose.connect('mongodb://10.68.47.224/musicdb');
	db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log("connection success");
	});
	initHelper();
};