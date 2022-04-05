var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var examinationPeriodSchema = new Schema({
    name: {type: String, required: true},
    year: {type: Number, required: true},
    opening: {type: Date, required: true},
    closing: {type: Date, required: true}
});

var examinationPeriod = mongoose.model('examinationPeriod', examinationPeriodSchema);

module.exports = examinationPeriod;