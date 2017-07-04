var createSongRow = function(songNumber, songName, songLength) {
    var template =
    '<tr class="album-view-song-item">'
  + '   <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
  + '   <td class="song-item-title">' + songName + '</td>'
  + '   <td class="song-item-duration">' + songLength + '</td>'
  + '</tr>'
  ;

    var $row = $(template);

    var clickHandler = function () {

      var songNumber = $(this).attr('data-song-number');

      if (currentlyPlayingSongNumber !== null) {
          // Revert to song number for currently playing song because user started playing next song.
          var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
          currentlyPlayingCell.html(currentlyPlayingSongNumber);
      }
      if (currentlyPlayingSongNumber !== songNumber) {
          // Switch from Play -> Pause button to indicate new song is playing.
          $(this).html(pauseButtonTemplate);
          currentlyPlayingSongNumber = songNumber;
          currentSongFromAlbum = currentAlbum.songs[songNumber - 1]; //Ask Will
          updatePlayerBarSong();
      } else if (currentlyPlayingSongNumber === songNumber) {
          // Switch from Pause -> Play button to pause currently playing song.
          $(this).html(playButtonTemplate);
          $('main-controls .play-pause').html(playerBarPlayButton);
          currentlyPlayingSongNumber = null;
          currentSongFromAlbum = null;
      }

    };

    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }

    };
    var offHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');

      if (songNumber !== currentlyPlayingSongNumber) {
          songNumberCell.html(songNumber);
      }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);

    return $row;
};


var $albumTitle = $('.album-view-title');
var $albumArtist = $('.album-view-artist');
var $albumReleaseInfo = $('.album-view-release-info');
var $albumImage = $('.album-cover-art');
var $albumSongList = $('.album-view-song-list');


var setCurrentAlbum = function(album) {
    currentAlbum = album;
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    // Clear contents of album song list container
    $albumSongList.empty();

    // Build list of songs from album JavaScript object
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    //We're incrementing the song here
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    //Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    //Set new song number
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    //Update Player Bar information
    updatePlayerBarSong();

    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    //Decrementing the index here
    currentSongIndex --;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    //Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    //Set new song number
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    //Update Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);


}

var updatePlayerBarSong = function (album) {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentSongFromAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

// Album button template
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

//store state of albums and playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);

    var albums = [albumPicasso, albumMarconi, albumMartin];
    var index = 1;
    $albumImage.click(function(){
      setCurrentAlbum(albums[index]);
      index++;
      if (index === albums.length) {
        index = 0;
      }
    });
  });
