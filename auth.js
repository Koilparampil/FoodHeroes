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
    //console.log(profile.emails[0].value)
    connection.query("SELECT * FROM users WHERE username = ?",[profile.emails[0].value], function(err, rows) {
      if (err)
          return done(err);
      if (rows.length) {
        
        return done(null, profile)
      } else {
    connection.query(`INSERT INTO users ( username, first_name, last_name ) values ('${profile.emails[0].value}','${profile.name.givenName}','${profile.name.familyName}')`,function(err, rows) {if(err){console.error(err)}});  
    return done(null, profile);
    }})
  }
));

passport.serializeUser(function(user,done){
    done(null,user)
})
passport.deserializeUser(function(user,done){
    done(null,user)
})