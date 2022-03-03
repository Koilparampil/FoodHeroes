const passport =require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
var mysql = require('mysql2');
var dbconfig = require('./config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.connect();
connection.query('USE ' + dbconfig.database);
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    //connection.query(`INSERT INTO users ( username ) values ('${profile.displayName}')`,function(err, rows) {if(err){console.error(err)}});  
    return done(null, profile);
  }
));

passport.serializeUser(function(user,done){
    done(null,user)
})
passport.deserializeUser(function(user,done){
    done(null,user)
})