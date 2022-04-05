var express = require('express');

var Admin = require('../models/admin');
var Student = require('../models/student');
var Professor = require('../models/professor');
var Way = require('../models/way');

var passport = require("../security/passport");

var router = express.Router();

router.post("/register", (req, res) => {
    var admin = new Admin();
    admin.username = req.body.username;
    admin.setPassword(req.body.password);

    admin.save((err) => {
        if (!err) {
            res.json("success").status(200).send();
        }
        else {
            res.json("failed").status(400).send();
        }
    });
});

router.post("/addStudent",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_ADMIN"),
    async (req, res) => {
        var student = new Student();

        var professor1 = await Professor.findOne({ email: req.body.student.email });
        var studentWithEmail = await Student.findOne({ email: req.body.student.email });
        var professor2 = await Professor.findOne({ username: req.body.student.username });
        var studentWithUsername = await Student.findOne({ username: req.body.student.username })

        var way = await Way.findOne({ name: req.body.student.way });


        student.username = req.body.student.username;
        student.setPassword(req.body.student.password);
        student.index = req.body.student.index;
        student.firstName = req.body.student.firstName;
        student.lastName = req.body.student.lastName;
        student.cuin = req.body.student.cuin;
        student.email = req.body.student.email;
        student.way = way;
        student.status = req.body.student.status;
        student.typeOfStudies = req.body.student.type;
        student.yearOfStart = req.body.student.yearOfStart;
        student.yearOfStudy = req.body.student.yearOfStudy;

        if (!professor1 && !professor2 && !studentWithEmail && !studentWithUsername) {
            student.save((err) => {
                if (!err)
                    res.json("success").status(200).send();
                else {
                    res.json("failed").status(400).send();
                    console.log(err);
                }
            });
        }
        else
            res.json({ message: "Email or username are taken" }).status(400).send();
    }
);

router.post("/addProfessor",
    passport.authenticate('jwt', { session: false }),
    passport.authorizeRoles("ROLE_ADMIN"),
    async (req, res) => {
        var professor = new Professor();

        console.log(req.body);

        var student1 = await Student.findOne({ email: req.body.professor.email });
        var student2 = await Student.findOne({ username: req.body.professor.username });
        var professorWithEmail = await Professor.findOne({ email: req.body.professor.email });
        var professorWithUsername = await Professor.findOne({ username: req.body.professor.username })

        professor.username = req.body.professor.username;
        professor.setPassword(req.body.professor.password);
        professor.firstName = req.body.professor.firstName;
        professor.lastName = req.body.professor.lastName;
        professor.email = req.body.professor.email;
        professor.cuin = req.body.professor.cuin;
        professor.title = req.body.professor.title;

        if (!student1 && !student2 && !professorWithEmail && !professorWithUsername) {
            professor.save((err) => {
                if (!err)
                    res.json("success").status(200).send();
                else
                    res.json("failed").status(400).send();
            });
        }
        else
            res.json({ message: "Email or username are taken" }).status(400).send();
    }
);

router.post("/login",
    /*passport.authenticate('local', { session: false }),*/
    async (req, res) => {
        var user = await Admin.findOne({ username: req.body.username });
        console.log(user);
        if (user) {
            if (user.validatePassword(req.body.password)) {
                var token = user.generateJwt();
                res.status(200).json(token);
            } else
                res.status(400).json("Wrong password");
        } else {

            user = await Professor.findOne({ username: req.body.username });
            console.log(user);
            if (user) {
                if (user.validatePassword(req.body.password)) {
                    var token = user.generateJwt();
                    res.status(200).json(token);
                } else
                    res.status(400).json("Wrong password");
            } else {

                user = await Student.findOne({ username: req.body.username });
                console.log(user);
                if (user) {
                    console.log(user.validatePassword(req.body.password));
                    if (user.validatePassword(req.body.password)) {
                        console.log(token);
                        var token = user.generateJwt();
                        res.status(200).json(token);
                    } else
                        res.status(400).json("Wrong password");
                }
            }
        }
    }
);

module.exports = router;