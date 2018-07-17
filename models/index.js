// require mongoose and connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/exBookTest', { useNewUrlParser: true });

let User = require('./user');
let Post = require('./post')

module.exports = {
  User: User,
  Post: Post
};
