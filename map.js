var map; 

var infowindow;

function initMap() {
	var mapOptions = {
		center: {lat: 43.225144, lng: 2.356822},
		zoom: 2,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	infowindow = new google.maps.InfoWindow(); 
}