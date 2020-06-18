var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    userID: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    URL1: {type: String}
    // imageURL: {
    //     URL1: {type: String}
    // }
    // URL1: {type: String},
    // URL2: {type: String},
    // URL3: {type: String},
    // URL4: {type: String},
    // URL5: {type: String}

});

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});
var User = mongoose.model('myuser', userSchema);
module.exports = User;
