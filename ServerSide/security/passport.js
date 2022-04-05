var passport = require('passport');
var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;

var Admin = require('../models/admin');
var Student = require('../models/student');
var Professor = require('../models/professor');
var secret = require('../utils/utils').secret;


var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

var localOptions = {
    usernameField: "username"
};

passport.use(new LocalStrategy(localOptions,
    async function (username, password, done) {
        
        var admin = await Admin.findOne({ username: username });
        if (!admin) {
            var student = await Student.findOne({ username: username });
            if (!student) {
                var professor = await Professor.findOne({ username: username });
                if (!professor.validatePassword(password))
                    return done(null, false, { message: 'Wrong password' });
                else return done(null, professor);
            }
            else if (!student.validatePassword(password))
                return done(null, false, { message: 'Wrong password' });
            else return done(null, student);
        }
        else if (!admin.validatePassword(password))
            return done(null, false, { message: 'Wrong password' });
        else return done(null, admin);
    }
)
)

passport.use(
    new JWTStrategy(jwtOptions,
        async function (jwt_payload, done) {
            try {
                var admin = await Admin.findOne({ _id: jwt_payload._id });
                if (!admin) {
                    var student = await Student.findOne({ _id: jwt_payload._id });
                    if (!student) {
                        var professor = await Professor.findOne({ _id: jwt_payload._id });
                        return done(null, professor);
                    }
                    else {
                        return done(null, student);
                    }
                }
                else 
                {
                    return done(null, admin);
                }
            } catch (err) {
                return done(err);
            } 
        }
    )
);

passport.authorizeRoles = function (...roles) {
    return async function (req, res, next) {
        if (roles.find(role => role === req.user.getRole())) {
            //console.log(role);
            next();
        }
        else {
            res.status(403).send();
        }
    }
}

module.exports = passport;