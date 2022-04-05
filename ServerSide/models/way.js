var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var waySchema = new Schema({
    name: {type: String, required: true}
});

var wayModel = mongoose.model('way', waySchema);
//
module.exports = wayModel;