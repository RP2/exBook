$(document).ready(function() {
  console.log('app.js loaded!');

$.ajax({
    method: 'GET',
    url: '/api/users',
    success: handleSuccess,
    error: handleError
  });

 var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    enter: {lat: -34.397, lng: 150.644}, zoom: 8});
  };
};
