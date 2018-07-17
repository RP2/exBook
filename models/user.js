// require mongoose
// set up shorthand Schema variable to stand in for mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = require('./post');

//User schema
var UserSchema = new Schema({
  username: String,
  password: String,
  location: Number,
  contact: String,
  picture: String,
  posts: [Post.schema]
});

//User model
var User = mongoose.model('User', UserSchema);

module.exports = User;
