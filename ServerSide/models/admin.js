var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var secretKey = require("../utils/utils").secret;

var adminSchema = new Schema({
    username: {type: String, required: true, unique: true},
    hash: {type: String, required: true},
    salt: {type: String, required: true}
});

adminSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
}

adminSchema.methods.validatePassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    return hash === this.hash;
}

adminSchema.methods.generateJwt = function() {
    var expire = new Date();
    expire.setDate(expire.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        role: "ROLE_ADMIN",
        expire: parseInt(expire.getTime() / 1000),
    }, secretKey);
}

adminSchema.methods.getRole = function() {
    return "ROLE_ADMIN";
}

var adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;