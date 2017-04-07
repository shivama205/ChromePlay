var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);

var playlists = [];
var tracks;


var GetPlaylistsURL = "https://api.myjson.com/bins/1dy373" //"http://siddartj.desktop.amazon.com:8081/getPlaylist";
// var GetPlaylistsPayload = {userID: 1};

var pl_data = [
    "58e6a5c90901df3c07642899", 
    "58e6a6b30901df3c0764289a",
    "58e6a6b40901df3c0764289b"
];

var songs = {
    "58e6a5c90901df3c07642899": [{
        "id": "1",
        "track": 1,
        "name": "s1",
        "length": "5:00",
        "file": "https://s3.amazonaws.com/mp3songslist/Britney+Spears+-+...Baby+One+More+Time.mp3"
    }, {
        "id": "2",
        "track": 2,
        "name": "s2",
        "length": "5:00",
        "file": "song"
    }],
    "58e6a6b30901df3c0764289a": [{
        "id": "3",
        "track": 3,
        "name": "s3",
        "length": "5:00",
        "file": "song"
    }, {
        "id": "4",
        "track": 4,
        "name": "s4",
        "length": "5:00",
        "file": "song"
    }, {
        "id": "5",
        "track": 5,
        "name": "s5",
        "length": "5:00",
        "file": "song"
    }], 
    "58e6a6b40901df3c0764289b": [{
        "id": "6",
        "track": 6,
        "name": "s6",
        "length": "5:00",
        "file": "song"
    }],
    "58e6a6b50901df3c0764289c": [{
        "id": "7",
        "track": 7,
        "name": "s7",
        "length": "5:00",
        "file": "song"
    }],
    "58e6a6b60901df3c0764289d": [{
        "id": "8",
        "track": 8,
        "name": "s8",
        "length": "5:00",
        "file": "song"
    }, {
        "id": "9",
        "track": 9,
        "name": "s9",
        "length": "5:00",
        "file": "song"
    }]
};


function getPlaylists() {

    $.ajax({
        type: "get",
        url: GetPlaylistsURL,
        // data: JSON.stringify(GetPlaylistsPayload),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log("Response from getPlaylistsAPI -> ");
            console.log(data);
            for (var i in data.data.playlists) {
                playlists.push(data.data.playlists[i].playlistID);
            }

            populatePlaylist();
            addOnclickListnersForPlaylists();

            populateSongs();
        },
        error: function(err) {
            console.log("err" + err);
        }
    });
}


function createPlaylistHeader(pl_header) {
    console.log(pl_header);
    var pl_parent_div = document.createElement("div");
    pl_parent_div.setAttribute("class", "panel panel-default");
    pl_parent_div.setAttribute("id", pl_header);

    var pl_div = document.createElement("div");
    pl_div.setAttribute("class", "panel-heading");

    var pl_h4 = document.createElement("h4");
    pl_h4.setAttribute("class", "panel-title");

    var pl_a = document.createElement("a");
    pl_a.setAttribute("data-toggle", "collapse");
    pl_a.setAttribute("data-parent", "#accordion");
    pl_a.setAttribute("href", "#collapse-" + pl_header);

    var pl_a_span = document.createElement("span");
    pl_a_span.appendChild(document.createTextNode(pl_header)); 
    pl_a_span.setAttribute("id", "id-" + pl_header); 

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
            var playlist = document.getElementById("id-" + playlists[i]);
            console.log(playlist);
            playlist.onclick = function() {
                playTracks(playlists[i]);
            }
        }
    )(i);
}

function createSongHeader(song) {
    var s_tr = document.createElement("tr");
    s_tr.setAttribute("id", "id-" + song.id);
    var s_td = document.createElement("td");

    var s_span = document.createElement("span");
    s_span.setAttribute("class", "glyphicon Halflings");
    s_span.appendChild(document.createTextNode(song.name));

    s_td.appendChild(s_span);
    s_tr.appendChild(s_td);

    return s_tr;
}

function populateSongs(playlist) {

    for (var i in playlists) {
        var playlist = playlists[i];

        var pl_parent_div = document.getElementById(playlist);

        var s_parent_div = document.createElement("div");
        s_parent_div.setAttribute("class", "panel-collapse collapse in");
        s_parent_div.setAttribute("id", "collapse-" + playlist);

        var s_div = document.createElement("div");
        s_div.setAttribute("class", "panel-body");
        s_div.setAttribute("div", "collapse-table-div");

        var s_table = document.createElement("table");
        s_table.setAttribute("class", "table");
        s_table.setAttribute("id", "collapse-table");

        for (var i in songs[playlist]) {
            s_tr = createSongHeader(songs[playlist][i]);
            s_table.appendChild(s_tr);
        }

        s_div.appendChild(s_table);
        s_parent_div.appendChild(s_div);

        pl_parent_div.appendChild(s_parent_div);
    }

}

function init() {
    getPlaylists();
    console.log("Playlists -> ");
    console.log(playlists);
}

// document.addEventListener("DOMContentLoaded", function() {
// 	getPlaylists();
//     console.log("Playlists -> ");
// 	console.log(playlists);
// });