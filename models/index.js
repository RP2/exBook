// require mongoose and connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/exBookTest');

let User = require('./user');
let Post = require('./post')

module.exports = {
  User: User,
  Post: Post
};
