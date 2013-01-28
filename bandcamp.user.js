// ==UserScript==
// @name          Bandcamp for Ubuntu
// @namespace     http://kartoffelmos.net/userscripts
// @description	  Unity integraton for Bandcamp
// @include       http://*.bandcamp.com/*
// @exclude       http://bandcamp.com
// @version       0.0.1
// ==/UserScript==

// todo:
// * make it work on single screen
// * make it work on custom domains

var Unity = external.getUnityObject(1.0); 


(function(){
	$('div.playbutton').on('click', function(){
	});
})()


function unityReady() {

	// check if this is strictly neccessary
	//window.setTimeout(function(){

		var title = $('#trackInfo .inline_player .title').text();

		$('div.playbutton')

		// proof on concept hack
		window.setInterval(function(){

			var isPlaying = $('div.playbutton').hasClass('playing');

			if(isPlaying) {
				Unity.MediaPlayer.setPlaybackState(Unity.MediaPlayer.PlaybackState.PLAYING);
			}
			else {
				Unity.MediaPlayer.setPlaybackState(Unity.MediaPlayer.PlaybackState.PAUSED);
				return;
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

	//}, 3000);

	// Register the buttons
	Unity.MediaPlayer.onPrevious(function() {
		$('div.prevbutton').click()
	});

	Unity.MediaPlayer.onNext(function() {
		$('div.nextbutton').click();
	});

	Unity.MediaPlayer.onPlayPause(function() {
		$('div.playbutton').click();
	});


	// Registers actions (todo: find appropriate actions)
	// Unity.Launcher.addAction("Collection", function(){
	// });
}

Unity.init({name: "Bandcamp",
            iconUrl: "http://i.imgur.com/wRGyEVM.png",
            onInit: unityReady});


