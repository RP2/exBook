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

$('#signupButton').on('click', function(){
  event.preventDefault();
    $('#signupModal').show();
    // $('#modalImg').attr('src', "./images/MG2.jpg");
});
$('#signupButton').on('click', function(){
    $('#loginModal').hide();
  });
$('.close').on('click', function(){
    $('#signupModal').hide();
  });

$('#postButton').on('click', function(){
  event.preventDefault();
  $('#postModal').show();
})
$('.close').on('click', function(){
    $('#postModal').hide();
  });

$('#profileButton').on('click', function(){
  event.preventDefault();
  $('#profileModal').show();
})
$('.close').on('click', function(){
    $('#profileModal').hide();
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

var map;

function initMap(responce){
  map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.78, lng: -122.44},
          zoom: 10
});

  for (var i = 0; i < responce.length; i++){
    var zip = responce[i].posts[i].location;
      var geoLocate = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}`;
        $.ajax({
          url: geoLocate,
          method: 'GET',
          success: pinSuccess,
        });
        function pinSuccess(responce){
          console.log(responce.results[0].geometry.location);
      var pinLat = responce.results[0].geometry.location.lat;
      var pinLng = responce.results[0].geometry.location.lng;
      var LatLng = new google.maps.LatLng(pinLat, pinLng);
      var marker = new google.maps.Marker({
        position: LatLng,
        map: map,
        icon: image
      });
    };
  };
};
};

function mapError(error1, error2, error3){
    console.log(error1);
    console.log(error2);
    console.log(error3);
  };
});
