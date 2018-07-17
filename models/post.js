var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// post schema
var PostSchema = new Schema({
    subject: String,
    title: String,
    volume: Number,
    price: Number,
    location: Number
});

// post model
var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
