var db = require('../models');

// GET '/api/users/:userId/posts'
function index(req, res) {
  db.User.findById(req.params.user_id, function(err, foundUser) {
    res.json(foundUser.posts);
  });
}

// POST '/api/users/:userId/posts'
function create(req, res) {
  db.User.findById(req.params.User_id, function(err, foundUser) {

    // dangerous – in a real app, we'd validate the incoming data
    var newPost = new db.Post(req.body);

    foundUser.Posts.push(newPost);
    foundUser.save(function(err, savedUser) {
      // responding with post in JSON
      // some APIs may respond with parent obj as well (e.g. founduser)
      res.json(newPost);
    });
  });
}

// PUT '/api/users/:userId/posts/:postId'
function update(req, res) {
  db.User.findById(req.params.user_id, function(err, foundUser) {
    var correctPost = foundUser.posts.id(req.params.post_id);

    if (correctPost) {
      correctPost.title = req.body.title;
      correctPost.volume = req.body.volume;
      correctPost.price = req.body.price;
      correctPost.location = req.body.location;

      foundUser.save(function(err, saved) {
        console.log('UPDATED', correctPost, 'IN ', saved.posts);
        res.json(correctPost);
      });
    } else {
      res.send(404);
    }
  });
}

// DELETE '/api/users/:userId/posts/:postId'
function destroy(req, res) {
  db.User.findById(req.params.user_id, function(err, foundUser) {
    console.log(foundUser);
    // we've got the user, now find the post within it
    var correctPost = foundUSer.posts.id(req.params.post_id);
    if (correctPost) {
      correctPost.remove();
      // resave the user now that the post is gone
      foundUser.save(function(err, saved) {
        console.log('REMOVED ', correctPost.name, 'FROM ', saved.posts);
        res.json(correctPost);
      });
    } else {
      res.send(404);
    }
  });
}

module.exports = {
  index: index,
  create: create,
  update: update,
  destroy: destroy
};
