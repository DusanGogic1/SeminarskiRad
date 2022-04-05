var express = require('express');

var Student = require('../models/student');
var Professor = require('../models/professor');
var Way = require('../models/way');
var Subject = require('../models/subject');
var ExaminationPeriod = require('../models/examination_period');

var passport = require("../security/passport");

var router = express.Router();

router.get("/getSubjects/:way",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_ADMIN"),
    async (req, res) => {
        var way = await Way.findOne({ _id: req.params.way });
        var subjects = await Subject.find({ way: way }).populate('professor');
        console.log(subjects);
        res.status(200).send(subjects);
    }
);

router.post("/addWay",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_ADMIN"),
    (req, res) => {
        var way = new Way();
        way.name = req.body.name;
        way.save((err) => {
            if (!err)
                res.json("success").status(200).send();
            else
                res.json("failed").status(400).send();
        });
    }
);

router.post("/addSubject",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_ADMIN"),
    async (req, res) => {
        var way = await Way.findOne({ name: req.body.subject.way });
        var professor = await Professor.findOne({ username: req.body.subject.professor });

        var subject = new Subject();
        subject.name = req.body.subject.name;
        subject.ESPB = req.body.subject.espb;
        subject.yearOfStudy = req.body.subject.yearOfStudy;
        subject.way = way;
        subject.professor = professor;

        subject.save((err) => {
            if (!err)
                res.json("success").status(200).send();
            else
                res.json("failed").status(400).send();
        });
    }
);

router.post("/openExaminationPeriod",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_ADMIN"),
    (req, res) => {
        var period = new ExaminationPeriod();

        period.name = req.body.period.name;
        period.year = req.body.period.year;
        period.opening = req.body.period.opening;
        period.closing = req.body.period.closing;

        period.save((err) => {
            if (!err)
                res.json("success").status(200).send();
            else
                res.json("failed").status(400).send();
        });
    }
);

router.delete("/deleteSubject/:id",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_ADMIN"),
    async (req, res) => {
        await Subject.deleteOne({ _id: req.params.id });
        res.status(200).send();
    }
);

router.get("/getStudents",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_ADMIN"),
    async (req, res) => {
        var students = await Student.find({
        }).populate('way').select(["-hash", "-salt"]);
        res.status(200).send(students);
    }
);

router.delete("/deleteStudent/:id",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_ADMIN"),
    async (req, res) => {
        await Student.deleteOne({ _id: req.params.id });
        res.status(200).send();
    }
);

router.delete("/deleteProfessor/:id",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_ADMIN"),
    async (req, res) => {
        await Professor.deleteOne({ _id: req.params.id });
        res.status(200).send();
    }
);

router.get("/getProfessor",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_ADMIN"),
    async (req, res) => {
        var professor = await Professor.find().select(["-hash", "-salt"]);
        res.status(200).send(professor);
    }
);

router.get('/getWays',
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_ADMIN"),
    async (req, res) => {
        var ways = await Way.find();
        res.status(200).send(ways);
    }
);

module.exports = router;