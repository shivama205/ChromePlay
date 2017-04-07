var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);

var playlists = [];
var playlistSongs = {};


var GetPlaylistsURL = "http://siddartj.desktop.amazon.com:8081/getPlaylist"; // "https://api.myjson.com/bins/1dy373"
var GetPlaylistsPayload = {userID: "58e770bca287e93430253801"};

var GetPlaylistSongsURL = "http://siddartj.desktop.amazon.com:8081/getSongs";
// var GetPlaylistSongsPayload = { playlistID: "58e7737c1ab0613543225047" };


var pl_data = [
    "58e6a5c90901df3c07642899", 
    "58e6a6b30901df3c0764289a",
    "58e6a6b40901df3c0764289b"
];


// var songs = {
//     "58e7737c1ab0613543225047": [{
//         "id": "1",
//         "track": 1,
//         "name": "s1",
//         "length": "5:00",
//         "file": "https://s3.amazonaws.com/mp3songslist/Britney+Spears+-+...Baby+One+More+Time.mp3"
//     }, {
//         "id": "2",
//         "track": 2,
//         "name": "s2",
//         "length": "5:00",
//         "file": "song.mp3"
//     }],
//     "58e773aae329a035d1739e6d": [{
//         "id": "3",
//         "track": 3,
//         "name": "s3",
//         "length": "5:00",
//         "file": "song.mp3"
//     }, {
//         "id": "4",
//         "track": 4,
//         "name": "s4",
//         "length": "5:00",
//         "file": "song.mp3"
//     }, {
//         "id": "5",
//         "track": 5,
//         "name": "s5",
//         "length": "5:00",
//         "file": "song.mp3"
//     }], 
//     "58e773bbe329a035d1739e6e": [{
//         "id": "6",
//         "track": 6,
//         "name": "s6",
//         "length": "5:00",
//         "file": "song.mp3"
//     }],
//     "58e6a6b50901df3c0764289c": [{
//         "id": "7",
//         "track": 7,
//         "name": "s7",
//         "length": "5:00",
//         "file": "song.mp3"
//     }],
//     "58e6a6b60901df3c0764289d": [{
//         "id": "8",
//         "track": 8,
//         "name": "s8",
//         "length": "5:00",
//         "file": "song.mp3"
//     }, {
//         "id": "9",
//         "track": 9,
//         "name": "s9",
//         "length": "5:00",
//         "file": "song.mp3"
//     }]
// };

function getPlaylistSongs(playlistID) {
    console.log("jdfbgkj");
    $.ajax({
        type: "post",
        url: GetPlaylistSongsURL,
        data: JSON.stringify({ "playlistID" : playlistID }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log("Response from getPlaylistSongsAPI -> ");
            console.log(data);
            playlistSongs[playlistID] = data.data.songs;
            console.log(playlistSongs);

            populateSongs(playlistID, data.data.songs);
        },
        error: function(err) {
            console.log("err" + err);
        }
    });
}


function getPlaylists() {

    $.ajax({
        type: "post",
        url: GetPlaylistsURL,
        data: JSON.stringify(GetPlaylistsPayload),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log("Response from getPlaylistsAPI -> ");
            console.log(data);
            playlists = data.data.playlists;

            populatePlaylist();

            for (var i in playlists) {
                console.log(playlists[i].playlistID);
                getPlaylistSongs(playlists[i].playlistID);    
            }


            addOnclickListnersForPlaylists();
            

        },
        error: function(err) {
            console.log("err" + err);
        }
    });
}



function createPlaylistHeader(playlist) {
    console.log(playlist);
    playlistID = playlist.playlistID;
    playlistName = playlist.name;

    var pl_parent_div = document.createElement("div");
    pl_parent_div.setAttribute("class", "panel panel-default");
    pl_parent_div.setAttribute("id", playlistID);

    var pl_div = document.createElement("div");
    pl_div.setAttribute("class", "panel-heading");

    var pl_h4 = document.createElement("h4");
    pl_h4.setAttribute("class", "panel-title");

    var pl_a = document.createElement("a");
    pl_a.setAttribute("data-toggle", "collapse");
    pl_a.setAttribute("data-parent", "#accordion");
    pl_a.setAttribute("href", "#collapse-" + playlistID);

    var pl_a_span = document.createElement("span");
    pl_a_span.appendChild(document.createTextNode(playlistName)); 
    pl_a_span.setAttribute("id", "id-" + playlistID); 

    pl_a.appendChild(pl_a_span);
    pl_h4.appendChild(pl_a);
    pl_div.appendChild(pl_h4);
    pl_parent_div.appendChild(pl_div);

    return pl_parent_div;
}

function populatePlaylist() {
    var pl_group = document.getElementById("accordion");
    // // pl_group.setAttribute("id", "accordion");
    // // pl_group.setAttribute("class", "panel-group");

    for (var i in playlists) {
        pl = createPlaylistHeader(playlists[i]);    
        pl_group.appendChild(pl);
    }
    console.log(pl_group);
}

function addOnclickListnersForPlaylists() {
    for (var i in playlists) (
        function(i) {
            var playlist = document.getElementById("id-" + playlists[i].playlistID);
            playlist.onclick = function() {
                playTracks(playlists[i].playlistID);
            }
        }
    )(i);
}

function createSongHeader(song) {
    var s_tr = document.createElement("tr");
    s_tr.setAttribute("id", "id-" + song.id);
    var s_td = document.createElement("td");


    var s_span = document.createElement("span");
    s_span.setAttribute("class", "glyphicon text-primary");
    s_span.appendChild(document.createTextNode(song.name));

    s_td.appendChild(s_span);
    s_tr.appendChild(s_td);

    return s_tr;
}

function populateSongs(playlistID, songs) {

    // for (var i in playlists) {
        // var playlist = playlists[i].playlistID;
        console.log(playlistID);
        var pl_parent_div = document.getElementById(playlistID);

        console.log(pl_parent_div);

        var s_parent_div = document.createElement("div");
        s_parent_div.setAttribute("class", "panel-collapse collapse");
        s_parent_div.setAttribute("id", "collapse-" + playlistID);

        var s_div = document.createElement("div");
        s_div.setAttribute("class", "panel-body");
        s_div.setAttribute("div", "collapse-table-div");

        var s_table = document.createElement("table");
        s_table.setAttribute("class", "table");
        s_table.setAttribute("id", "collapse-table");

        for (var i in songs) {
            s_tr = createSongHeader(songs[i]);
            s_table.appendChild(s_tr);
        }

        s_div.appendChild(s_table);
        s_parent_div.appendChild(s_div);

        pl_parent_div.appendChild(s_parent_div);
    // }

}




// function init() {
//     // getPlaylists();
//     // for (var i in playlists) {
//     //     console.log(playlists[i].playlistID);
//     //     getPlaylistSongs(playlists[i].playlistID);
//     // }
// }


document.addEventListener("DOMContentLoaded", function() {
	getPlaylists();
 //    console.log("Playlists -> ");
	// console.log(playlists);
});