var db = require('../models');

// GET /api/users
function index(req, res) {
  // access database and pull out all users
  db.User.find({}, function(err, allUsers) {
    res.json(allUsers);
  });
}
//login function
function login(req,res) {
  console.log(req.body)
  db.User.findOne({username: req.body.username}, function(err, foundUser){
    if (err) { console.log('error', err); }
    if (foundUser){
      if (foundUser.password === req.body.password){
        res.json(foundUser);
      } else {res.status(400)}
    }
  })
}

// POST /api/users
function create(req, res) {
  // create a user based on request body and send it back as JSON
  db.User.create(req.body, function(err, user) {
    if (err) { console.log('error', err); }
    res.json(user);
  });
}

// GET /api/users/:userId
function show(req, res) {
  // find one user by id and send it back as JSON
  var test = req.params.user_id;
  db.User.findById(test, function(err, foundUser) {
    console.log(foundUser)
    res.json(foundUser);
  });
}

// DELETE /api/users/:userId
function destroy(req, res) {
  // find one user by id, delete it, and send it back as JSON
  db.User.findByIdAndRemove(req.params.user_id, function(err, deletedUser) {
    if (err) { console.log('error', err); }
    res.send(200);
  });
}

// PUT or PATCH /api/user/:userId
function update(req, res) {
  // find one user by id, update it based on request body,
  // and send it back as JSON

  db.User.findById(req.params.id, function(err, foundUser) {
    if (err) { console.log('userController.update error', err); }
    foundUser.username = req.body.username;
    foundUser.password = req.body.password;
    foundUser.location = req.body.location;
    foundUser.contact = req.body.contact;
    foundUser.picture = req.body.picture;
    foundUser.posts = req.body.posts
    foundUser.save(function(err, savedUser) {
      if (err) { console.log('saving altered user failed'); }
      res.json(savedUser);
    });
  });
}

module.exports = {
  index: index,
  login: login,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
