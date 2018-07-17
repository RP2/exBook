$(document).ready(function() {
  console.log('app.js loaded!');


// $.ajax({
//     method: 'GET',
//     url: '/api/users',
//     success: handleSuccess,
//     error: handleError
//   });

$('#loginButton').on('click', function(){
  event.preventDefault();
    $('#loginModal').show();
    // $('#modalImg').attr('src', "./images/MG2.jpg");
    $('#modalP').html(`<p>Login or Sign up</p>`);
});
$('.close').on('click', function(){
    $('#loginModal').hide();
  });


  function initMap() {
    var map;
    map = new google.maps.Map(document.getElementById('map'), {
    enter: {lat: -34.397, lng: 150.644}, zoom: 8});
  };
});
