// Album Examples

var albumPicasso = {
  title: "The Colors",
  artist: "Pablo Picasso",
  label: "Cubism",
  year: "1881",
  albumArtUrl: "assets/images/album_covers/01.png",
  songs: [
      { title: "Blue", duration: "4:26" },
      { title: "Green", duration: "3:14" },
      { title: "Red", duration: "5:01" },
      { title: "Pink", duration: "3:21" },
      { title: "Magenta", duration: "2:15" }
  ]
};

var albumMarconi = {
  title: "The Telephone",
  artist: "Guglielmo Marconi",
  label: "EM",
  year: "1909",
  albumArtUrl: "assets/images/album_covers/20.png",
  songs: [
      { title: "Hello, Operator?", duration: "1:01" },
      { title: "Ring, ring, ring", duration: "5:01" },
      { title: "Fits in your pocket", duration: "3:21" },
      { title: "Can you hear me now?", duration: "3:14" },
      { title: "Wrong phone number", duration: "2:15" }
  ]
};

var albumMartin = {
  title: "Learning to Program",
  artist: "Martin Klotzman",
  label: "Tech World Struggles",
  year: "2017",
  albumArtUrl: "assets/images/album_covers/21.png",
  songs: [
      { title: "Defintions using definiton", duration: "4:11" },
      { title: "Just when you think you understand", duration: "2:11" },
      { title: "A million computer tabs", duration: "3:56" },
      { title: "Seeing the light", duration: "1:44" },
      { title: "Nvm still far away", duration: "9:12" }
  ]
};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
    '<tr class="album-view-song-item">'
  + '   <td class="song-item-number">' + songNumber + '</td>'
  + '   <td class="song-item-title">' + songName + '</td>'
  + '   <td class="song-item-duration">' + songLength + '</td>'
  + '</tr>'
  ;

    return template;
};
// Select elements that we want to populate with text dynamically
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
    // Assign values to each part of the album (text, image)
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + " " + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    // Clear contents of album song list container
    albumSongList.innerHTML = " ";

    // Build list of songs from album JavaScript object
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};
var songlistContainer = document.getElementsByClassName('album-view-song-list')[0];

// Album button template
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"</span></a>';

window.onload = function() {
    setCurrentAlbum(albumPicasso);

    songlistContainer.addEventListener('mouseover', function(event){
      // #1
      console.log(event.target);

      if(event.target.parentElement.className === "album-view-song-item") {
        event.target.parentElement.querySelector(".song-item-number").innerHTML = playButtonTemplate;
      }

    });

    albums = [albumPicasso, albumMarconi, albumMartin];
    index = 0;
    albumImage.addEventListener("click", function(event) {
        setCurrentAlbum(albums[index]);
        index++;
        if(index == albums.length) {
          index = 0;
        }

    });
};
