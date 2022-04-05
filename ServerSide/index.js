var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');

var config = require('./utils/utils').config;
var authRoute = require('./routes/authRoute');
var adminRoute = require('./routes/adminRoute');
var studentRoute = require('./routes/studentRoute');
var professorRoute = require('./routes/professorRoute');
var passport = require('./security/passport');

mongoose.connect(config.dbConnection,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

var app = express();
var corsOptions = {
    origin: 'http://localhost:4200',
    credentials:true, 
    optionsSuccessStatus: 200,
    methods: "GET, POST, DELETE, PUT, PATCH"
};

app.use('*', cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/professor", professorRoute);
app.use("/student", studentRoute);

app.listen(config.port, () => {
    console.log("Running on port " + config.port);
});