// ==UserScript==
// @name          BandCamp Ubuntu Unity thingy
// @namespace     http://kartoffelmos.net/userscripts
// @description	  Greets the world
// @include       http://*.bandcamp.com/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, 
var Unity = external.getUnityObject(1.0); 


(function(){
	$('div.playbutton').on('click', function(){
	});
})()

// Player.Playlist.LangUtils.makeclass.play
// Player.Playlist.LangUtils.makeclass.next_track






function unityReady() {

	// check if this is strictly neccessary
	window.setTimeout(function(){

		var title = $('#trackInfo .inline_player .title').text();

		$('div.playbutton')




		// proof on concept hack
		window.setInterval(function(){

			if($('div.playbutton').hasClass('playing')) {
				Unity.MediaPlayer.setPlaybackState(Unity.MediaPlayer.PlaybackState.PLAYING)
			}
			else {
				Unity.MediaPlayer.setPlaybackState(Unity.MediaPlayer.PlaybackState.PAUSED)
			}

			var checkTitle = $('#trackInfo .inline_player .title')[0].innerHTML;
			if(title != checkTitle) {
				title = checkTitle;
				changeTrack();
			}
			

			function changeTrack() {
				var artist = $('#name-section h3 span').text();
				var artLocation = $('#tralbumArt img').attr('src');
				var trackInfo = {title: title,
				                 album: $('#name-section .trackTitle').text(),
				                 artist: artist,
				                 artLocation: artLocation}

				Unity.MediaPlayer.setTrack(trackInfo);
				Unity.Notification.showNotification(title, artist, artLocation);

			}

		}, 500); // todo: find a reasonable interval. ver2: track javascript



	console.log(Unity);
	}, 3000);

	// Register the buttons
	Unity.MediaPlayer.onPrevious(function() {
		console.log('pressed previous');
		$('div.prevbutton').click()
	});

	Unity.MediaPlayer.onNext(function() {
		$('div.nextbutton').click();
	});

	Unity.MediaPlayer.onPlayPause(function() {
		$('div.playbutton').click();
	});

}

Unity.init({name: "BandCamp Unity",
            iconUrl: "http://i.imgur.com/wRGyEVM.png",
            onInit: unityReady});


