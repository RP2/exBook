var db = require("./models");

var usersList = [
{
  username: "Mark01",
  password: "password",
  location: 93933,
  contact: "email@email.email",
  picture: "LINK-TO-IMG"
  // posts: {
  //   subject: "science",
  //   title: "micro biology for beginners",
  //   volume: 7,
  //   price: 15,
  //   location: 94587
  // }
},
{
  username: "jon25687",
  password: "password",
  location: 94804,
  contact: "email@email.email",
  picture: "LINK-TO-IMG"
  // posts: {
  //   subject: "math",
  //   title: "algebra 4",
  //   volume: 4,
  //   price: 20,
  //   location: 94530
  // }
},
{
  username: "bigboy77",
  password: "password",
  location: 94530,
  contact: "email@email.email",
  picture: "LINK-TO-IMG"
  // posts: {
  //   subject: "art",
  //   title: "art history",
  //   volume: 1,
  //   price: 1,
  //   location: 93933}
},
{
  username: "stephany",
  password: "password",
  location: 93933,
  contact: "email@email.email",
  picture: "LINK-TO-IMG"
  // posts: {
  //   subject: "science",
  //   title: "micro biology for pros",
  //   volume: 10,
  //   price: 100,
  //   location: 94587
  // }
},
{
  username: "457138",
  password: "password",
  location: 94587,
  contact: "email@email.email",
  picture: "LINK-TO-IMG"
}
];

var postsList = [
{
  subject: "science",
  title: "micro biology for beginners",
  volume: 7,
  price: 15,
  location: 94587
},
{
  subject: "math",
  title: "algebra 4",
  volume: 4,
  price: 20,
  location: 94530
},
{
  subject: "art",
  title: "art history",
  volume: 1,
  price: 1,
  location: 93933
},
{
  subject: "science",
  title: "micro biology for pros",
  volume: 10,
  price: 100,
  location: 94587
}
]

usersList.forEach(function(user) {
  user.posts = postsList;
});


db.User.remove({}, function(err, users){
  // code in here runs after all users are removed
  db.User.create(usersList, function(err, users){
    // code in here runs after all users are created
    if (err) { return console.log('ERROR', err); }
    console.log("all users:", users);
    console.log("created", users.length, "users");
    process.exit();
  });
  db.Post.create(postsList, function(err, posts){
    // code in here runs after all users are created
    if (err) { return console.log('ERROR', err); }
    console.log("all posts:", posts);
    console.log("created", posts.length, "postss");
    process.exit();
  });
});
