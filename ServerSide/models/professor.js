var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var secretKey = require('../utils/utils').secret;

var professorSchema = new Schema({
    username: {type: String, required: true, unique: true},
    hash: {type: String, required: true},
    salt: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    cuin: {type: String, required: true, unique: true}, //JMBG
    title: {type: String, required: true},
});

professorSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
}

professorSchema.methods.validatePassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    return hash === this.hash;
}

professorSchema.methods.generateJwt = function() {
    var expire = new Date();
    expire.setDate(expire.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        role: "ROLE_PROFESSOR",
        expire: parseInt(expire.getTime() / 1000),
    }, secretKey);
}

professorSchema.methods.getRole = function() {
    return "ROLE_PROFESSOR";
}

var professorModel = mongoose.model('professor', professorSchema);

module.exports = professorModel;