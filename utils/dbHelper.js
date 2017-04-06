var mongoose = require('mongoose');
var mongodb = require('mongodb');

var Schema = mongoose.Schema;
var Model = mongoose.model.bind(mongoose);
var models = {};
var db;

function initHelper() {
	initUser();
}

function initUser () {
	var schema = new Schema ({
		username: String,
		password: String,
	});
	schema.methods.
	var model = Model('users', schema);
	models.userModel = model;
}


function isExistingUser (username) {
	return false;
}

exports.login = function (options) {
	var username = options.username;
	var password = options.password;
	if (!isExistingUser(username)) {
		return {
			success: false,
			error: "user doesn't exists",
		};
	} else {

	}
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