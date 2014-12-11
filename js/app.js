// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

$(document).ready(function () {
	function initialize() {
        var mapOptions = {
          center: { lat: 47.6, lng: -122.3},
          zoom: 12
        };
        var map = new google.maps.Map(document.getElementById('map'),
            mapOptions);
        google.maps.event.addListener(map, "click", function() {
        	infoWindow.close();
        });
        $.getJSON("http://data.seattle.gov/resource/65fc-btcc.json", function(data) {
    		$.each(data, function(i, item) {
    			var markerLatLng = new google.maps.LatLng(item.location.latitude, item.location.longitude);
    			var marker = new google.maps.Marker({
    				position : markerLatLng,
    				map: map,
    				cameraLabel: item.cameralabel
    			});
    			google.maps.event.addListener(marker, "click", function() {
    				map.panTo(this.getPosition());
    				infoWindow.open(map, this);
    				infoWindow.setContent(
    					"<p>" + item.cameralabel + "</p><img src=\"" + item.imageurl.url + "\" alt=\"The position you clicked\" />"
    				);
    			})
    			allMarkers.push(marker);
    		})
    		$("#search").bind("search keyup", function() {
    			$.each(allMarkers, function(i, marker) {
		    		var label = marker.cameraLabel.toLowerCase();
		    		var query = $("#search").val().toLowerCase();
		    		if(label.indexOf(query) != -1) {
		    			marker.setMap(map);
		    		} else {
		    			marker.setMap(null);
		    		}
		    	});
		    });
    	})
    	.fail(function (jqxhr, status, error) {
    		var err = status + ", " + error;
    		alert("Request Failed: " + jqxhr.responseText);
    	});
      }
    google.maps.event.addDomListener(window, 'load', initialize);

    var infoWindow = new google.maps.InfoWindow();

    var allMarkers = [];


});

