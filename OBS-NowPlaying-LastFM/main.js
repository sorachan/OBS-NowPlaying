var interval = 1; // query interval in seconds
var bounceInterval = 15; // label bounce interval in seconds
var username = 'john.doe'; // your Last.FM username
var apiKey = "fb5daac5ce459db403f5cd24c9ddc04a";
var albumArt = true; // set to false if you don't want art

var root = document.getElementById('root');
var nowPlaying = document.getElementById('nowplaying');

var getRecentTracks = function () {
  var request = new XMLHttpRequest();
  request.open(
    'GET',
    'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&nowplaying="true"&user='
    + username + '&api_key=' + apiKey + '&format=json',
    true
  );
  request.onload = processRecentTracks;
  request.send();
};

var processRecentTracks = function () {
  // get JSON object from API
  var data = JSON.parse(this.response);
  console.log(data)
  // set "now playing" label
  nowPlaying.innerHTML = (
    (
      albumArt ? (
        '<img id="albumart" src="'
        + data.recenttracks.track[0].image.slice(-1)[0]['#text']
        + '"> '
      ) : ''
    )
    + '<em>'
    + data.recenttracks.track[0].name
    + '</em>&nbsp;by&nbsp;<em>'
    + data.recenttracks.track[0].artist['#text']
    + '</em>'
  );
  // animate if necessary
  var textWidth = nowPlaying.offsetWidth;
  var rootWidth = root.clientWidth;
  rootWidth -= 2 * parseFloat(getComputedStyle(root).padding);
  var documentRoot = document.querySelector(':root');
  documentRoot.style.setProperty('--textWidth', textWidth + 'px');
  documentRoot.style.setProperty('--rootWidth', rootWidth + 'px');
  if (textWidth > rootWidth) {
    nowPlaying.style.animation = 'floatText '
    + bounceInterval + 's infinite alternate ease-in-out';
  } else {
  	nowPlaying.style.animation = '';
  }
}

getRecentTracks();

setInterval(
  getRecentTracks,
  interval * 1000
);


