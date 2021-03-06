// get all the tools we need
var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var app = express();
var port = process.env.PORT || 8080;
require("./auth");
var passport = require("passport");
var flash = require("connect-flash");
require("./config/passport")(passport); // pass passport for configuration

// set up our middleware
app.use(morgan("dev")); // log every request to the console
app.use(express.json());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(
  express.urlencoded({
    extended: true,
  })
);

//this is how everything renders
app.set("view engine", "ejs"); // set up ejs for templating



// required for passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(__dirname + "/public"));

// routes ======================================================================
require("./app/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport
const api = require('./app/index.js');
app.use('/api', api);
// launch ======================================================================
app.listen(port, () => console.log(`listening on port ${port}`));

