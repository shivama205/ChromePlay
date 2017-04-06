// audiojs.events.ready(function() {
//     var as = audiojs.createAll();
// });

// document.write('<audio src="song.mp3" preload="auto" />');

var data = {
	"status": 200,
	"msg": "ok",
	"data": [
		"Playlist1",
		"Playlist2",
		"Playlist3"
	]
};

var mediaPlayer;
var playbtn;
var stopbtn;
var progressBar;
var playlistDiv;

document.addEventListener("DOMContentLoaded", function() {
	initializeMediaPlayer();
	initializeMediaPlayerControls();
	initializePlaylistDiv();
}, false);

function createPlaylist(playlists) {
	var list = document.createElement("ul");
	list.setAttribute("id", "playlist-ul");
	list.setAttribute("class", "list-group");

	for(var i in playlists) { 
		console.log(playlists[i]);
		var listItem = document.createElement("li");
		listItem.setAttribute("class", "list-group-item");
		listItem.appendChild(document.createTextNode(playlists[i]));
		list.appendChild(listItem);
	}

	// for(var playlist in playlists) {
	// 	var listitem = new PlayListItem();
	// 	listitem.name.innerHTML = playlist;
	// 	console.log(listitem);
	// 	list.appendChild(listitem);
	// }
	
	playlistDiv.appendChild(list);
}

function initializePlaylistDiv() {
	playlistDiv = document.getElementById("playlist-div");

	createPlaylist(data.data);
}

function initializeMediaPlayer() {
	mediaPlayer = document.getElementById("media-audio");
	mediaPlayer.controls = false;
}

function initializeMediaPlayerControls() {
	playbtn = document.getElementById("play-pause-button");
	stopbtn = document.getElementById("stop-button");
	progressBar = document.getElementById("progress-bar");

	togglePlayPause();
	stopPlayer();

	mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
}

function updateProgressBar() {
	
	var percentage = Math.floor((100 / mediaPlayer.duration) * (mediaPlayer.currentTime));
	progressBar.value = percentage;
	progressBar.innerHTML = percentage + "% Played";
}

function stopPlayer() {
	
	stopbtn.addEventListener("click", function() {
		mediaPlayer.pause();
		mediaPlayer.currentTime = 0;
		changeButtonType(playbtn, "play");
	});
}

function changeButtonType(btn, value) {
	btn.title = value;
	btn.innerHTML = value;
}

function togglePlayPause() {
	
	playbtn.addEventListener("click", function() {
		if (mediaPlayer.paused || mediaPlayer.ended) {
			changeButtonType(playbtn, "pause");
			mediaPlayer.play();
		} else {
			changeButtonType(playbtn, "play");
			mediaPlayer.pause();
		}
	});
}