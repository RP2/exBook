var book_endpoint = "http://localhost:3000/api/users/"

$(document).ready(function() {
  console.log('app.js loaded!');

$('#loginButton').on('click', function(){
  event.preventDefault();
    $('#loginModal').show();
    // $('#modalImg').attr('src', "./images/MG2.jpg");
    $('#modalP').html(`<p>Login or Sign up</p>`);
});
$('.close').on('click', function(){
    $('#loginModal').hide();
  });

//begin map code
  $.ajax({
    url: book_endpoint,
    method: 'GET',
    success: mapSuccess,
    error: mapError,
  });

  var mapTitle;
  var thePosition;
  var image = {
    url: 'https://git.generalassemb.ly/sf-wdi-46/jquery-geoquakes-lab/blob/master/images/earthquake.png?raw=true',
    size: new google.maps.Size(20,32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0,0),
    scaledSize: new google.maps.Size(25,25)
  };


function mapSuccess(responce){
  // for (let i = 0; i < responce.features.length; i++){
  //     mapTitle = responce.features[i].properties.place
  //     $('#info').append('<p>' + mapTitle + '</p>');
  //   };
  console.log(responce);
  // marker(responce);
  initMap(responce);
};

var map;

function initMap(responce){
  map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.78, lng: -122.44},
          zoom: 10
});

  for (var i = 0; i < responce.length; i++){
    var zip = responce[i].posts[i].location;
    console.log(zip);
    for (var j = 0; j < responce.length; j++){
      var geoLocate = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}`;
      var pinLocation = geoLocate;
      var LatLng = new google.maps.LatLng(pinLocation[0], pinLocation[1]);
      var marker = new google.maps.Marker({
        position: LatLng,
        map: map,
        icon: image
      });
    };
  };
};


function mapError(error1, error2, error3){
    console.log(error1);
    console.log(error2);
    console.log(error3);
  };
});
