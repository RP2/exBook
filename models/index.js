// require mongoose and connect to database
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/exBookTest', { useNewUrlParser: true });
// heroku db
var uri = 'mongodb://heroku_2nzq3ptj:rft13d0fv7otomskr09vsoihfs@ds145951.mlab.com:45951/heroku_2nzq3ptj';

var options = { useNewUrlParser: true };

let User = require('./user');
let Post = require('./post')

module.exports = {
  User: User,
  Post: Post
};

mongoose.connect(uri, options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
