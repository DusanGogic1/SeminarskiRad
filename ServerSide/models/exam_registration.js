var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var examRegistrationSchema = new Schema({
    subject: {type: Schema.ObjectId, ref: 'subject'},
    student: {type: Schema.ObjectId, ref: 'student'},
    examinationPeriod: {type: Schema.ObjectId, ref: 'examinationPeriod'},
    mark: {type: Number, required: false}
});

var examRegistrationModel = mongoose.model('examRegistration', examRegistrationSchema);

module.exports = examRegistrationModel;