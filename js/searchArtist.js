document.addEventListener("DOMContentLoaded", artistButton);

function artistButton(){
	document.getElementById("artistSubmit").addEventListener("click", function(event){
		var req = new XMLHttpRequest();
		var payload = {	artist: null};
		payload.artist = document.getElementById("artist").value;
		
		var parameter = "?q=" + payload.artist + "&type=artist";
	
		req.open("GET", "https://api.spotify.com/v1/search" + parameter, true);
		req.addEventListener("load", function(){
			if (req.status >= 200 && req.status < 400){
				var response = JSON.parse(req.responseText);
				document.getElementById("artistName").textContent = response.artists.items["0"].name;

				var artistImg = document.getElementById("artistPic");
				artistImg.src = response.artists.items["0"].images["1"].url;

				document.getElementById("artistPop").textContent = response.artists.items["0"].popularity;
				document.getElementById("artistFoll").textContent = response.artists.items["0"].followers.total;

				if (response.artists.items["0"].genres.length == 0)
					document.getElementById("artistGenre").textContent = "No genres listed";
				
				else
					document.getElementById("artistGenre").textContent = response.artists.items["0"].genres;
			}

			else
				console.log("Error in network request: " + req.statusText);
		});

		req.send(null);
		event.preventDefault();
	});
}