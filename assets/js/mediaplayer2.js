// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);

var playlists = [];

var GetPlaylistsURL = "http://siddartj.desktop.amazon.com:8081/getPlaylist";
var GetPlaylistsPayload = {userID: 1};

var pl_data = [
    "pl1", 
    "pl2",
    "pl3"
];

var songs = {
    "58e6a5c90901df3c07642899": [{
        "track": 1,
        "name": "s1",
        "length": "5:00",
        "file": "song"
    }, {
        "track": 2,
        "name": "s2",
        "length": "5:00",
        "file": "song"
    }],
    "58e6a6b30901df3c0764289a": [{
        "track": 3,
        "name": "s3",
        "length": "5:00",
        "file": "song"
    }, {
        "track": 4,
        "name": "s4",
        "length": "5:00",
        "file": "song"
    }, {
        "track": 5,
        "name": "s5",
        "length": "5:00",
        "file": "song"
    }], 
    "58e6a6b40901df3c0764289b": [{
        "track": 6,
        "name": "s6",
        "length": "5:00",
        "file": "song"
    }],
    "58e6a6b50901df3c0764289c": [{
        "track": 7,
        "name": "s7",
        "length": "5:00",
        "file": "song"
    }],
    "58e6a6b60901df3c0764289d": [{
        "track": 8,
        "name": "s8",
        "length": "5:00",
        "file": "song"
    }, {
        "track": 9,
        "name": "s9",
        "length": "5:00",
        "file": "song"
    }]
};

// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/

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
    // pl_a_span.setAttribute("class", "glyphicon glyphicon-folder-close");
    pl_a_span.appendChild(document.createTextNode(pl_header)); 
    pl_a_span.setAttribute("id", "id-" + pl_header); 
    // pl_a_span.setAttribute("innerHTML", pl_header);

    pl_a.appendChild(pl_a_span);
    pl_h4.appendChild(pl_a);
    pl_div.appendChild(pl_h4);
    pl_parent_div.appendChild(pl_div);

    return pl_parent_div;
}

function populatePlaylist() {
    // var pl_group = document.getElementById("accordion");
    // // pl_group.setAttribute("id", "accordion");
    // // pl_group.setAttribute("class", "panel-group");
    console.log("skjgkjg");
    // console.log(pl_group);

    console.log(playlists);

    for (var i = 0; i < playlists.length; i++) {
        console.log(i);
    }

    for (var i in playlists) {
        console.log(i);
        // console.log("snfgjkgnk -> " + pls[i]);
        // pl = createPlaylistHeader(playlists[i]);    
        // pl_group.appendChild(pl);
    }
}

function createSongHeader(song) {
    var s_tr = document.createElement("tr");
    var s_td = document.createElement("td");

    var s_span = document.createElement("span");
    s_span.setAttribute("class", "glyphicon glyphicon-pencil text-primary");
    s_span.appendChild(document.createTextNode(song.name));

    s_td.appendChild(s_span);
    s_tr.appendChild(s_td);

    return s_tr;
}

function populateSongs() {

    for (var playlist in songs) {
        console.log(playlist);

        var pl_parent_div = document.getElementById(playlist);

        var s_parent_div = document.createElement("div");
        s_parent_div.setAttribute("class", "panel-collapse collapse in");
        s_parent_div.setAttribute("id", "collapse-" + playlist);

        var s_div = document.createElement("div");
        s_div.setAttribute("class", "panel-body");

        var s_table = document.createElement("table");
        s_table.setAttribute("class", "table");

        for (var i in songs[playlist]) {
            s_tr = createSongHeader(songs[playlist][i]);
            s_table.appendChild(s_tr);
        }

        s_div.appendChild(s_table);
        s_parent_div.appendChild(s_div);

        pl_parent_div.appendChild(s_parent_div);
    }

}

function getPlaylistSongs(playlist) {
    // var pl = {
    //         "58e6a5c90901df3c07642899": [{
    //             "track": 1,
    //             "name": "s1",
    //             "length": "5:00",
    //             "file": "song"
    //         }, {
    //             "track": 2,
    //             "name": "s2",
    //             "length": "5:00",
    //             "file": "song"
    //         }],
    //         "58e6a6b30901df3c0764289a": [{
    //             "track": 3,
    //             "name": "s3",
    //             "length": "5:00",
    //             "file": "song"
    //         }, {
    //             "track": 4,
    //             "name": "s4",
    //             "length": "5:00",
    //             "file": "song"
    //         }, {
    //             "track": 5,
    //             "name": "s5",
    //             "length": "5:00",
    //             "file": "song"
    //         }], 
    //         "58e6a6b40901df3c0764289b": [{
    //             "track": 6,
    //             "name": "s6",
    //             "length": "5:00",
    //             "file": "song"
    //         }],
    //         "58e6a6b50901df3c0764289c": [{
    //             "track": 7,
    //             "name": "s7",
    //             "length": "5:00",
    //             "file": "song"
    //         }],
    //         "58e6a6b60901df3c0764289d": [{
    //             "track": 8,
    //             "name": "s8",
    //             "length": "5:00",
    //             "file": "song"
    //         }, {
    //             "track": 9,
    //             "name": "s9",
    //             "length": "5:00",
    //             "file": "song"
    //         }]
    //     };

    for (var key in songs) {
        if (key == playlist) {
            return pl[key];
        }
    }

    return pl[playlist];
}

function getTracks(playlist) {
    console.log(playlist);
    return getPlaylistSongs(playlist);
}


// jQuery(function ($)
function playTracks(playlist) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = '', // 'https://archive.org/download/mythium/',
            extension = '',
            tracks = getTracks(playlist),
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackLength = value.length;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                } else {
                    trackNumber = '' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }

}; //);

function getPlaylists() {

    $.ajax({
        type: "post",
        url: GetPlaylistsURL,
        data: JSON.stringify(GetPlaylistsPayload),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log(data);
            for (var i in data.data.playlists) {
                playlists.push(data.data.playlists[i].playlistID);
            }
        },
        error: function(err) {
            console.log("err" + err);
        }
    });
}

function addOnclickListnersForPlaylists() {
    
    for (var i in playlists) (
        function(i) {
            var playlist = document.getElementById("id-" + playlists[i]);
            playlist.onclick = function() {
                playTracks(playlists[i]);
            }
        }
    )(i);
}


document.addEventListener("DOMContentLoaded", function() {
    
    getPlaylists();
    console.log(playlists);

    populatePlaylist();
    // populateSongs();

    // addOnclickListnersForPlaylists();

    // callAjax('http://siddartj.desktop.amazon.com:8081/login', {
    //     username: "siddarth",
    //     password: "Jindal"
    // }, function(data, status){
    //     console.log(data);
    //     console.log(status);
    // });
});


