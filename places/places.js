var map, placesList,crd;
var markers{};


function success(pos) {
  crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
 
  var pyrmont = new google.maps.LatLng(crd.latitude, crd.longitude);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: pyrmont,
    zoom: 17
  });

  var request = {
    location: pyrmont,
    radius: 5000,
    keyword: "gym",
    keyword: "fit",
    types: ['restaurant','gym']
  };
  
  placesList = document.getElementById('places');

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

function initialize() {
 var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};
	navigator.geolocation.getCurrentPosition(success, error, options);        
 
}

function callback(results, status, pagination) {
  if (status != google.maps.places.PlacesServiceStatus.OK) {
    return;
  } else {
    createMarkers(results);

    if (pagination.hasNextPage) {
      var moreButton = document.getElementById('more');

      moreButton.disabled = false;

      google.maps.event.addDomListenerOnce(moreButton, 'click',
          function() {
        moreButton.disabled = true;
        pagination.nextPage();
      });
    }
  }
}

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0,place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      id: place.place_id,
      position: place.geometry.location
    });
    markers[place.place_id]=marker;
    placesList.innerHTML += '<a href="javaScript:void(0);" value="'+place.place_id+'" class="list-group-item">'+ place.name+'</a>';
    
    
    google.maps.event.addListener(marker, 'click', function(){
      var request = {
        placeId: this.id
      };
      
      var service = new google.maps.places.PlacesService(map);
      var ic = this.icon; 
      
      service.getDetails(request, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          var marker = new google.maps.Marker({
            map: map,
            icon: ic,
            position: place.geometry.location,
            id: place.place_id
          });
          
          
          var contentString = '<h3>'+place.name+'</h3>';
          if (place.opening_hours && place.opening_hours.open_now){
            var oppened = (place.opening_hours.open_now) ? "Yes":"No";
            contentString+='Oppened: '+oppened+'<br>';
          }
          if (place.opening_hours && place.opening_hours.periods && place.opening_hours.periods[0].open && place.opening_hours.periods[0].close)
            contentString+='Oppening hours:<br>MON-FRI: '+place.opening_hours.periods[1].open.time.substr(0,2)+':'+place.opening_hours.periods[1].open.time.substr(2,4)+
            '-'+place.opening_hours.periods[1].close.time.substr(0,2)+':'+place.opening_hours.periods[1].close.time.substr(2,4)+'<br>'+
            'SAT: '+place.opening_hours.periods[6].open.time.substr(0,2)+':'+place.opening_hours.periods[6].open.time.substr(2,4)+
            '-'+place.opening_hours.periods[6].close.time.substr(0,2)+':'+place.opening_hours.periods[6].close.time.substr(2,4)+'<br>'+
            'SUN: '+place.opening_hours.periods[0].open.time.substr(0,2)+':'+place.opening_hours.periods[0].open.time.substr(2,4)+
            '-'+place.opening_hours.periods[0].close.time.substr(0,2)+':'+place.opening_hours.periods[0].close.time.substr(2,4)+'<br>'
            ;
            
          if(place.rating != null)
            contentString+='Rating: '+place.rating+'<br>';
          if(place.url != null)
            contentString+='<a href="'+place.url+'">Webpage</a>';
          var infowindow = new google.maps.InfoWindow({content: contentString });
          infowindow.open(map, marker);
     }
    else alert("Napaka");
  });
      
    });
   
    //console.log(place.formatted_phone_number);

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
  
  
}

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function(){
 $('#places').on('click', 'a', function() {
   alert("Delej");
   var id = this.attr('value');
   alert(id);
   google.maps.event.trigger(markers[id], 'click');
});
  
});