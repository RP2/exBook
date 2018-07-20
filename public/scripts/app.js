//our backend data//
var book_endpoint = "http://localhost:3000/api/users/"

let signedIn;

//document on ready//
$(document).ready(function() {
  console.log('app.js loaded!');
  getBooks();
//////////nav function////////////
  $('.hamburger').on('click', function(){
    event.preventDefault();
  $('.miniNav').toggle('fast');
  $(window).on('resize',function(){
    if (window.innerWidth >= 700){
      $('.miniNav').hide();
    };
  });
});
  $('.miniNav a').on('click', function(){
    event.preventDefault();
    $('.miniNav').toggle('fast');
  $(window).on('resize',function(){
    if (window.innerWidth >= 700){
      $('.miniNav').hide();
    };
  });
  });
//hamburger on hover//
  $('.hamburger').mouseenter(function(){
    $('.bar').css('background-color', '#FFC7E2')
  });
  $('.hamburger').mouseleave(function(){
    $('.bar').css('background-color', '#B2678C')
  });
//////////login button function////////////
$('.loginButton').on('click', function(){
  event.preventDefault();
    $('#loginModal').show();
});
$('.close').on('click', function(){
    $('#loginModal').hide();
  });
$('#loginSubmit').on('click', function(){
    $('#loginModal').hide();
  });
//////////logout button function////////////
$('.logoutButton').on('click', function(){
  location.reload()
})
//////////signup button function////////////
$('#signupButton').on('click', function(){
  event.preventDefault();
    $('#signupModal').show();
});
$('#signupButton').on('click', function(){
    $('#loginModal').hide();
  });
$('.close').on('click', function(){
    $('#signupModal').hide();
  });
$('#signUpButton').on('click', function(){
    $('#signupModal').hide();
  });
//////////post button function//////////////
$('.postButton').on('click', function(){
  event.preventDefault();
  $('#postModal').show();
})
$('.close').on('click', function(){
    $('#postModal').hide();
  });
$('#postSubmit').on('click', function(){
    $('#postModal').hide();
  });
//////////profile button function///////////
$('.profileButton').on('click', function(){
  event.preventDefault();
  $('#profileModal').show();
})
$('.close').on('click', function(){
    $('#profileModal').hide();
  });


/////////////////////begin login function code//////////////////////

$('#loginForm').on('submit', function(event){
  event.preventDefault();
  var loginData = $(this).serialize();
  console.log(loginData);
  $.ajax({
    url: "http://localhost:3000",
    method: 'POST',
    data: loginData,
    success: loginSuccess,
    error: mapError
  });
  function loginSuccess(responce){
    console.log('Res', responce)
    signedIn = responce._id;
    console.log('user', signedIn)
    $('.loginButton').hide();
    $('.profileButton').show();
    $('.logoutButton').show();
    $('#userProfile').append(`<p id="profileUsername">Username: ${responce.username}</p><p id="profileLocation">Location: ${responce.location}</p>`);
  };
})

/////////////////////begin user edit function code//////////////////////

$('#editUserButton').on('click', function(){
  $('#editUserForm').show();
})

$('#editUserForm').on('submit', function(event){
  event.preventDefault();
  var editData = $(this).serialize();
  console.log('edit data', editData)
  $.ajax({
    url: `http://localhost:3000/api/users/${signedIn}`,
    method: 'PUT',
    data: editData,
    success: editSuccess,
    error: mapError
  });
  function editSuccess(responce){
    console.log('success!')
    $('#editUserForm').hide();
    $('#profileModal').hide();
    $('#userProfile').html('')
    $('#userProfile').append(`<p id="profileUsername">Username: ${responce.username}</p><p id="profileLocation">Location: ${responce.location}</p>`);
  }
})

/////////////////////begin user edit function code//////////////////////

$('#deleteUserButton').on('click', function(event){
  event.preventDefault();
  $.ajax({
    url: `http://localhost:3000/api/users/${signedIn}`,
    method: 'DELETE',
    success: function(result){
      location.reload()
    }
  });

})

/////////////////////begin signup function code//////////////////////

$('#signUpForm').on('submit', function(event){
  event.preventDefault();
  var signData = $(this).serialize();
  $.ajax({
    url: "http://localhost:3000/api/users",
    method: 'POST',
    data: signData,
    success: signSuccess,
    error: mapError
  });
  function signSuccess(responce){
    signedIn = responce._id;
    $('.navButtons').append('<p>Your account has been created!');
  }
})

/////////////////////begin post function code//////////////////////

$('#postForm').on('submit', function(event){
  event.preventDefault();
  console.log('add-post clicked!');
  var formData = $(this).serialize();
  console.log(formData);//user id//
    $.post(`/api/users/${signedIn}/posts`, formData, function(post) {
      $('#results').html('');
      getBooks();
    })
    // reset form input values after formData has been captured
    $(this).trigger("reset");
});

$('#results').on('click', '#deletePost', function(event) {
  console.log(this);
  var id = $(this).parent().data('id');
  console.log('id', id);
  $.ajax({
    url: `/api/users/${signedIn}/posts/${id}`, //deletes matching id
    type: 'DELETE',
    success: function(result) {
      console.log('deleted post')
      // $(id).remove();
      $('#results').html('');
      getBooks();
    }
  });
});

////init map////
function getBooks() {
    $.ajax({
    url: book_endpoint,
    method: 'GET',
    success: mapSuccess,
    error: mapError,
  });
}

//////////////////////begin search function code///////////////////

$('#searchForm').on('submit', function(event){
  event.preventDefault();
  $('#results').html('');
  var searchData = $('#searchForm input').val();
  $.ajax({
    url: book_endpoint,
    method: 'GET',
    success: searchSuccess,
    error: mapError
  });
  function searchSuccess(responce){
    responce.forEach(function(user){
      console.log(user)
      for (let i = 0; i < user.posts.length; i++){
        var bookTitle = user.posts[i].title;
        if (searchData == bookTitle){
          console.log('found book!', searchData, ' = ', bookTitle);
          $('#results').append(`<h3>${bookTitle} exists!</h3>`);
        }
      };
    });
    getBooks();
  };
  $(this).trigger("reset");
});

//////////////////////////begin map code//////////////////////////

  var mapTitle;
  var thePosition;
  var image = {
    url: '../images/bookPin.png',
    size: new google.maps.Size(100,100),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0,0),
    scaledSize: new google.maps.Size(25,25)
  };

//appends results to the #results div//
function mapSuccess(responce){
  responce.forEach(function(user){
    console.log(user.posts);
  for (let i = 0; i < user.posts.length; i++){
      var mapTitle = user.posts[i].title;
      var mapPrice = user.posts[i].price;
      var mapId = user.posts[i]._id;
      $('#results').append(`<p data-id="${mapId}"><button id="deletePost">delete</button> ${mapTitle}, $${mapPrice}</p>`);
    }
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
//show map markers based on user posts//
responce.forEach(function(user){
    for (var i = 0; i < user.posts.length; i++){
      var zip = user.posts[i].location;
      var geoLocate = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}`;
        $.ajax({
          url: geoLocate,
          method: 'GET',
          success: pinSuccess,
        });//success function//
      function pinSuccess(responce){
        var pinLat = responce.results[0].geometry.location.lat;
        var pinLng = responce.results[0].geometry.location.lng;
        var LatLng = new google.maps.LatLng(pinLat, pinLng);
        var marker = new google.maps.Marker({
          position: LatLng,
          map: map,
          icon: image
        });
       }; //end of pinSuccess
      };
    });
  };
}; //end of map success//

//incase of error//
function mapError(error1, error2, error3){
  console.log(error1);
  console.log(error2);
  console.log(error3);
};

}); // END DOCUMENT READY
