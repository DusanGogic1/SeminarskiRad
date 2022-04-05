var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subjectSchema = new Schema({
    name: {type: String, required: true},
    ESPB: {type: Number, required: true},
    way: {type: Schema.ObjectId, ref: 'way'},
    yearOfStudy: {type: Number, required: true},
    professor: {type: Schema.ObjectId, ref: 'professor'}
});

var subjectModel = mongoose.model('subject', subjectSchema);

module.exports = subjectModel;