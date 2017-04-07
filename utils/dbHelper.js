var mongoose = require('mongoose');
var mongodb = require('mongodb');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;
var Model = mongoose.model.bind(mongoose);
var models = {};
var db;

function initHelper() {	
	initUser();
	initPlaylist();
	initPlaylistSongsMap();
	initSongs();
}

function initUser () {
	var schema = new Schema ({
		username: { type: String, required: true, index: { unique: true } },
    	password: { type: String, required: true }
	});
	schema.pre('save', function(next) {
	    var user = this;

	    // only hash the password if it has been modified (or is new)
	    if (!user.isModified('password')) return next();

	    // generate a salt
	    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
	        if (err) return next(err);

	        // hash the password using our new salt
	        bcrypt.hash(user.password, salt, function(err, hash) {
	            if (err) return next(err);

	            // override the cleartext password with the hashed one
	            user.password = hash;
	            next();
	        });
	    });
	});

	schema.methods.comparePassword = function(candidatePassword, cb) {
	    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
	        if (err) return cb(err);
	        cb(null, isMatch);
	    });
	};
	module.exports = mongoose.model('users', schema);
	var model = Model('users', schema);
	models.userModel = model;
}

function initPlaylist () {
	var schema = new Schema ({
		name: String,
		userID: String
	});
	var model = Model('playlists', schema);
	models.playlistModel = model;
}

function initPlaylistSongsMap(){
	var schema = new Schema({
		playlistID: String,
		songID: String
	});
	var model = Model('playlist_songs_map', schema, 'playlist_songs_map');
	models.songsplaylistModel = model;
}

function initSongs() {
	var schema = new Schema({
		track:String,
		name: String,
		length:String,
		songURL: String
	});
	var model = Model('songs', schema)
	models.songsModel = model;
}

function responseHelper(error, data, callback) {
	if (error) {
		console.log(error);
		callback({
			status: 301,
			success: false,
			message: "database failure" + error
		});
	} else if (!data) {
		callback({
			status: 400,
			success: false,
			message: "bad request"
		});
	} else {
		callback({
			status: 200,
			message: "OK",
			success: true,	
			data: JSON.stringify(data)
		});
	}
}

exports.getSongURLS = function (options, cb) {
	var model = models.songsModel;
	var idObjects= [];
	for(var i=0;i<options.length;i++) {
		idObjects.push(mongoose.Types.ObjectId(options[i]));
	}
	var requestObj = {
		'_id': {
			$in: idObjects
		}
	};
	model.find(requestObj, function(err,docs) {
		responseHelper(err, docs, cb);
	});
};

exports.getSongIDs = function (options, cb) {
	var model = models.songsplaylistModel;	
	var requestObj = {
		playlistID: options.playlistID
	};

	model.find(requestObj, 'songID', function(err, docs) {
		responseHelper(err, docs, cb);
	});	
};

exports.getPlaylist = function (options, cb) {
	var model = models.playlistModel;
	var requestObj = {
		userID: options.userID
	};
	model.find(requestObj, '_id name' ,function(err, docs) {
		responseHelper(err, docs, cb);
	});
};

exports.login = function (options, cb) {
	var model = models.userModel;
    // hash the password using our new salt        
	model.findOne({ username: options.username }, function(err, user) {
		if (user) {
			user.comparePassword(options.password, function(err, isMatch) {
				if (!isMatch) {
					user = 0;
				}
				responseHelper(err, user, cb);
	    		console.log(options.password, isMatch); 
	    	});
		} else {
			responseHelper(err,user, cb);
		}	
	});    
};

exports.signup = function (options, cb) {
	var user = new models.userModel(options);
	console.log("username " + user.username);
	console.log("password " + user.password);

    user.save(function (err, user) {
		if (err) {
			console.log("user save failed");
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
}

exports.createPlaylist = function (options, cb) {
	var playlist = new models.playlistModel(options);
	console.log("name " + playlist.name);
	console.log("userID " + playlist.userID);        
        
    playlist.save(function (err, playlist) {
		if (err) {
			console.log("playlist save failed");
			console.log(err);
			cb({
				success: false,
				error: err,
			});
		} else {
			playlist.success = true;
			cb(playlist);
		}		    
	});    
}

exports.loadSong = function (options, cb) {
	var song = new models.songsModel(options);
	console.log("song name " + song.name);
	console.log("song URL " + song.songURL);        
        
    song.save(function (err, song) {
		if (err) {
			console.log("song save failed");
			console.log(err);
			cb({
				success: false,
				error: err,
			});
		} else {
			song.success = true;
			cb(song);
		}		    
    });    
}

exports.SongPlaylistMap = function (options, cb) {
	var map = new models.songsplaylistModel(options);
	console.log("playlist ID " + map.playlistID);
	console.log("song ID " + map.songID);           
    map.save(function (err, map) {
		if (err) {
			console.log("song playlist map save failed");
			console.log(err);
			cb({
				success: false,
				error: err,
			});
		} else {
			map.success = true;
			cb(map);
		}		    
    });    
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