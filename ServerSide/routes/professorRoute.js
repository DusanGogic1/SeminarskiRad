var express = require('express');

var Subject = require('../models/subject');
var Professor = require('../models/professor');
var ExamRegistration = require('../models/exam_registration');
var Student = require('../models/student');

var passport = require("../security/passport");

var router = express.Router();

router.get("/getInfo/:id",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_PROFESSOR"),
    async (req, res) => {
        var professor = await Professor.findOne({ _id: req.params.id });
        res.status(200).json(professor).send();
    }
);

router.put("/examMarking/:id/:mark",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_PROFESSOR"),
    async (req, res) => {
        console.log(req.params);
        await ExamRegistration.updateOne(
            { _id: req.params.id },
            { $set: { mark: req.params.mark } }
        );

        res.status(200).send("success");
    }
);

router.get('/getSubjects/:id',
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_PROFESSOR"),
    async (req, res) => {
        var professor = await Professor.findOne({ _id: req.params.id });
        var subjects = await Subject.find({ professor: professor }).populate("way");

        res.status(200).json(subjects).send();
    }
);

router.get("/getStudentsForSubject/:id",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_PROFESSOR"),
    async (req, res) => {
        var subject = await Subject.findOne({ _id: req.params.id }).populate("way");
        var way = subject.way;
        var students = await Student.find({ way: way });

        res.json(students).status(200).send();
    }
);

router.get("/getStudentsForFillingMarks/:id",
    passport.authenticate("jwt", { session: false }),
    passport.authorizeRoles("ROLE_PROFESSOR"),
    async (req, res) => {
        var subjects = await Subject.find({ _id: req.params.id }).populate("way");

        var students = await ExamRegistration.find({
            subject: {$in: subjects},
            mark: {$nin : [5, 6, 7, 8, 9, 10]}
        })
        .populate(["student", "examinationPeriod", "subject"]);

        res.status(200).send(students);
    }
);

module.exports = router;