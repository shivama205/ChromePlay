


// function getPlaylistSongs(playlist) {
//     console.log(playlist);
//     console.log(songs[playlist]);
//     return songs[playlist];
// }

function getTracks(playlist) {
    console.log(playlist);
    console.log(playlistSongs[playlist]);
    return playlistSongs[playlist];
    // return getPlaylistSongs(playlist);
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
                //$('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
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
            tr = $('#collapse-table tr').click(function () {
                tracks = getTracks($(this).parent().parent().parent().parent().prop("id"));
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }), 
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrackById = function (id) {
                $('.plSel').removeClass('plSel');
                $("#collapse-table tr:eq(" + id + ")").addClass('plSel');
                // console.log(tracks);
                // console.log(tracks[id]);
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].url + extension;
            },
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].url + extension;
            },
            playTrack = function (id) {
                loadTrackById(id);
                audio.play();
            };
        // extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }

}; //);



