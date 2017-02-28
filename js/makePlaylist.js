document.addEventListener("DOMContentLoaded", playlistButton);
document.addEventListener("DOMContentLoaded", generatePlaylist);

var artistID;
var relArtists = new Array();
var topTracks = new Array();

function playlistButton(){
	document.getElementById("artistSubmit").addEventListener("click", function(event){
		var req = new XMLHttpRequest();
		var payload = {	artist: null};
		payload.artist = document.getElementById("artist").value;
		
		var parameter = "?q=" + payload.artist + "&type=artist";
	
		req.open("GET", "https://api.spotify.com/v1/search" + parameter, true);
		req.addEventListener("load", function(){
		if (req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			console.log(response);
				
			artistID = response.artists.items["0"].id;
			getRelatedArtists(artistID);
		}
			
		else
	
			console.log("Error in network request: " + req.statusText);
		});

		req.send(null);
		event.preventDefault();
	});
}

function generatePlaylist(){
	document.getElementById("playlistSubmit").addEventListener("click", function(event){

		if (document.getElementById("playlist").textContent != 0){
			document.getElementById("playlist").textContent = "";
		}

		for (var p in relArtists){
			getTopTracks(relArtists[p]);
		}
	});

}	

function getRelatedArtists(artistID){
	var req = new XMLHttpRequest();
	var payload = artistID;

	req.open("GET", "https://api.spotify.com/v1/artists/" + payload + "/related-artists");
	req.addEventListener("load", function(){
		if (req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);

			for (var i in response.artists){
				relArtists[i] = response.artists[i].id;
			}
		}
	

		else
			console.log("Error in network request: " + req.statusText);
	});

	req.send(null);
	event.preventDefault();
};

function getTopTracks(artistID){
	var req = new XMLHttpRequest();
	var artistPayload = artistID;
	JSON.stringify(artistPayload);
	console.log(artistPayload);
	req.open("GET", "https://api.spotify.com/v1/artists/" + artistPayload + "/top-tracks" + "?country=us");
	req.addEventListener("load", function(){
			if (req.status >= 200 && req.status < 400){						
				var response = JSON.parse(req.responseText);
				console.log(response);
				for (var i in response.tracks){
					topTracks[i] = response.tracks[i].name;
				}

				document.getElementById("playlist").textContent += response.tracks[0].artists[0].name + " - " + "\n" + JSON.stringify(topTracks) + "\n" + "\n";
			}

			else
				console.log("Error in network request: " + req.statusText);
	});

	req.send(null);
	event.preventDefault();
}


