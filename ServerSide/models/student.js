var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var secretKey = require("../utils/utils").secret;

var studentSchema = new Schema({
    username: {type: String, required: true, unique: true},
    hash: {type: String, required: true},
    salt: {type: String, required: true},
    index: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    cuin: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    way: {type: Schema.ObjectId, ref: 'way'},
    status: {type: String, required: true},
    typeOfStudies: {type: String, required: true},
    yearOfStart: {type: Number, required: true},
    yearOfStudy: {type: Number, required: true},
});

studentSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
}

studentSchema.methods.validatePassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    return hash === this.hash;
}

studentSchema.methods.generateJwt = function() {
    var expire = new Date();
    expire.setDate(expire.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        role: "ROLE_STUDENT",
        username: this.username,
        expire: parseInt(expire.getTime() / 1000),
    }, secretKey);
}

studentSchema.methods.getRole = function() {
    return "ROLE_STUDENT";
}

var studentModel = mongoose.model('student', studentSchema);

module.exports = studentModel;