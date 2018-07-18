var book_endpoint = "http://localhost:3000/api/users/"

$(document).ready(function() {
  console.log('app.js loaded!');
  getBooks();
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

$('#postForm').on('submit', function(event){
  event.preventDefault();
  console.log('add-post clicked!');
  var formData = $(this).serialize();
  console.log(formData);
    $.post('/api/users/5b4e784628f651a6289793b9/posts', formData, function(post) {
      renderPost(post);
    })
    // reset form input values after formData has been captured
    $(this).trigger("reset");
});

$('#postDelete').on('click', function(e) {
  var id = $(this).closest('.post').data('post-id');
  console.log('id', id);
  $.ajax({
    url: '/api/users/5b4e784628f651a6289793b9/posts' + id,
    type: 'DELETE',
    success: function(result) {
      console.log('deleted post')
      $('[data-post-id=' + id + ']').remove();
    }
  });
});

// function renderPost(post) {
//   $('#results').append(this);
// }

//////////////////////////begin map code//////////////////////////
function getBooks() {
    $.ajax({
    url: book_endpoint,
    method: 'GET',
    success: mapSuccess,
    error: mapError,
  });
}



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
  responce.forEach(function(user){
    console.log(user.posts);
  for (let i = 0; i < user.posts.length; i++){
    // for(let j = 0; j < responce.length; j++){
      mapTitle = user.posts[i].title;
      mapPrice = user.posts[i].price;
      $('#results').append('<p>' + mapTitle + ', $' + mapPrice + '</p>');
    }
  // };
});
  console.log(responce);
// marker(responce);
  initMap(responce);
  var map;
//initialize map
    function initMap(responce){
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.78, lng: -122.44},
        zoom: 10
    });
//show map markers
responce.forEach(function(user){
    for (var i = 0; i < user.posts.length; i++){
        var zip = user.posts[i].location;
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
    });
  };
};

function mapError(error1, error2, error3){
    console.log(error1);
    console.log(error2);
    console.log(error3);
  };

}); // END DOCUMENT READY
