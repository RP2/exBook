var book_endpoint = "http://localhost:3000/api/users/"

$(document).ready(function() {
  console.log('app.js loaded!');
///////////////////////////////////////////
//////////login button function////////////
///////////////////////////////////////////
$('#loginButton').on('click', function(){
  event.preventDefault();
    $('#loginModal').show();
    // $('#modalImg').attr('src', "./images/MG2.jpg");
    $('#modalP').html(`<p>Login or Sign up</p>`);
});
$('.close').on('click', function(){
    $('#loginModal').hide();
  });
////////////////////////////////////////////
//////////signup button function////////////
////////////////////////////////////////////
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
////////////////////////////////////////////
//////////post button function//////////////
////////////////////////////////////////////
$('#postButton').on('click', function(){
  event.preventDefault();
  $('#postModal').show();
})
$('.close').on('click', function(){
    $('#postModal').hide();
  });
$('#postSubmit').on('click', function(){
    $('#postModal').hide();
  });
////////////////////////////////////////////
//////////profile button function///////////
////////////////////////////////////////////
$('#profileButton').on('click', function(){
  event.preventDefault();
  $('#profileModal').show();
})
$('.close').on('click', function(){
    $('#profileModal').hide();
  });

/////////////////////begin post function code//////////////////////

$('#postForm').on('submit', function(e){
  e.preventDefault();
  var formData = $(this).serialize();
  $.post('/api/users/:user_id/posts', formData, function(post){
    renderPost(post);
  })
  $(this).trigger('reset');
});

  // add click handler to 'add post' buttons
  $('#posts').on('click', '.add-post', function(e) {
    console.log('add-post clicked!');

    var id = $(this).closest('.post').data('post-id');
    console.log('id', id);

    $('#postModal').data('post-id', id);
    $('#postModal').modal();
  });

  $('#posts').on('click', '.delete-post', function(e) {
    var id = $(this).closest('.post').data('post-id');
    console.log('id', id);

    $.ajax({
      url: '/api/users/:user_id/posts' + id,
      type: 'DELETE',
      success: function(result) {
        $('[data-post-id=' + id + ']').remove();
      }
    });
  });

//////////////////////////begin map code//////////////////////////
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
  for (let i = 0; i < responce.length; i++){
      mapTitle = responce[i].posts[i].title;
      mapPrice = responce[i].posts[i].price;
      $('#results').append('<p>' + mapTitle + ', $' + mapPrice + '</p>');
    };
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
