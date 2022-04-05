var express = require('express');

var Student = require('../models/student');
var ExaminationPeriod = require('../models/examination_period');
var ExamRegistration = require('../models/exam_registration');
var Subject = require('../models/subject');

var passport = require("../security/passport");

var router = express.Router();

router.get("/getInfo/:id",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_STUDENT"),
    async (req, res) => {
        var student = await Student.findOne({ _id: req.params.id })
            .populate('way');
        res.status(200).send(student);
    }
);

router.post("/examRegistration",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_STUDENT"),
    async (req, res) => {
        var student = await Student.findOne({ _id: req.body.student });
        var subject = await Subject.findOne({ _id: req.body.subject });
        var examinationPeriod = await ExaminationPeriod.findOne(
            { name: req.body.periodName, year: req.body.year });
        var examRegistration = new ExamRegistration();
        examRegistration.student = student;
        examRegistration.subject = subject;
        examRegistration.examinationPeriod = examinationPeriod;

        examRegistration.save((err) => {
            if (!err) {
                res.status(200).send("success");
            }
            else {
                res.status(400).send("failed");
            }
        }
        );
    }
);

router.get("/getExamRegistrations/:id",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_STUDENT"),
    async (req, res) => {
        var student = await Student.findOne({ _id: req.params.id });
        var examRegistrations = await ExamRegistration.find({ student: student })
            .populate("subject")
            .populate("examinationPeriod");

        res.status(200).send(examRegistrations);
    }
);

router.get("/getPassedExams/:id",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_STUDENT"),
    async (req, res) => {
        var student = await Student.findOne({ _id: req.params.id });
        var passedExams = await ExamRegistration.find({
            student: student,
            mark: {$in: [6, 7, 8, 9, 10]}
        })
        .populate("subject")
        .populate("examinationPeriod")
        .populate("student");

        res.status(200).json(passedExams).send();
    }
);

router.get("/getOpenedPeriods",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_STUDENT"),
    async (req, res) => {
        var date = new Date();
        var period = await ExaminationPeriod.findOne({
            opening: { $lte: date },
            closed: { $gte: date }
        });
        if (period) res.status(200).send(period);
        else res.status(200).send(false);
    }
);

router.get("/getNotPassedExams/:id",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_STUDENT"),
    async (req, res) => {
        var student = await Student.findOne({ _id: req.params.id });
        var passedExams = await ExamRegistration.find({
            student: student,
            mark: {$in: [6, 7, 8, 9, 10]}
        })
        .populate("subject")
        .select(["subject"]);
        
        passedExams = passedExams.map(function(item) {
            return item.subject.name;
          });


        var notPassedExams = await Subject
            .find({
                name: { $nin: passedExams },
                way: student.way
            })
            .populate(['professor']);

        res.status(200).send(notPassedExams);
    }
);

router.get('/examsICanRegister/:id',
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_STUDENT"),
    async (req, res) => {
        var student = await Student.findOne({ _id: req.params.id });

        var passedExams = await ExamRegistration.find()
            .populate('examinationPeriod')
            .find({
                student: student,
                mark: {$in: [6, 7, 8, 9, 10]}
            })
            .populate('subject')
            .select(['subject', "-_id", "-examinationPeriod"])
        
        passedExams = passedExams.map((function(item) {
            return item.subject.name;
          }));


        var subjects = await Subject
            .find({
                name: { $nin: passedExams },
                way: student.way
            })
            .populate(['professor']);

        res.status(200).send(subjects);
    }
);

module.exports = router;