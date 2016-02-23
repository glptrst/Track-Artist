	//store the orginal array the api give us in reponse
	var events;
	//store the transformed array with the information we need
	var mapped; 
	//store the artist to search for 
	var artist;
	//text box element
	var textInput = window.document.getElementById('artist');
	//search button element
	var button = window.document.getElementById('search');
	//add listener on button when clicked 
	button.addEventListener('click', getData);
	//store markers
	var markers = []; 

	//parse the response 
	window.parseResponse = function(data) {
		//store original array
		events = data; 
		//store mapped array 
	    mapped = events.map(function(event) {
			var mappedEvent = {};
			mappedEvent.artistName = event.artists[0].name;
			mappedEvent.artistThumb = event.artists[0].thumb_url;
			mappedEvent.date = event.formatted_datetime;
			if (event.ticket_status === 'available'){
				mappedEvent.ticketInfo = '<span id="available">' + event.ticket_status + '</span>';
			} else{
				mappedEvent.ticketInfo = '<span id="unavailable">' + event.ticket_status + '</span>';
			}
			
			if (event.ticket_url) {
				mappedEvent.ticketInfo += ", buy <a href='" + event.ticket_url + "'>here</a>";
			}
			mappedEvent.rsvp = event.facebook_rsvp_url;
			mappedEvent.title = event.title;
			mappedEvent.location = event.formatted_location;  
			mappedEvent.venue = {};
			mappedEvent.venue.city = event.venue.city; 
			mappedEvent.venue.country = event.venue.country; 
			mappedEvent.venue.name = event.venue.name;
			//mappedEvent.venue.region = event.venue.region;
			mappedEvent.venue.coordinates = {};
			mappedEvent.venue.coordinates.lat = event.venue.latitude;
			mappedEvent.venue.coordinates.lng = event.venue.longitude;
			return mappedEvent;
		})
		//create markers on map
		setMarkers(); 

		function setMarkers() {
			//remove markers of precedent search
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(null); 
			}
			markers = [];

			for (var i = 0; i < mapped.length; i++) {
				var event = mapped[i];
				var marker = new google.maps.Marker({
					position: event.venue.coordinates,
					map: map,
					title: event.title + " " + event.date,
					//icon: image,
					info: 
						  "Artist: " + event.artistName + "<br>" +
						  "Date: " + event.date + "<br>" +
						  "Venue: " + event.location + ", "+ event.venue.name + "<br>" +
						  "Tickets: " + event.ticketInfo + "<br>" +
						  "<a href='" + event.rsvp + "'>RSVP Link</a>" 
				})

				//info windows
				marker.addListener('click', function() {
					infowindow.setContent(this.info);
					infowindow.open(map, this);
				});

				//push markers in the markers array so we can remove them when we need to
				markers.push(marker); 
			}
		}
	};

	//handler for the click event on the search button
	function getData(event) {
		//get url to send request to
		var url = "http://api.bandsintown.com/artists/" + textInput.value + "/events.json?api_version=2.0&app_id=BANDSINMAP&callback=parseResponse";
		console.log(url); 
		//create script to load data (JSONP?)
		var scriptEl = window.document.createElement('script');
		scriptEl.setAttribute('src', url);
		document.body.appendChild(scriptEl);
	}



