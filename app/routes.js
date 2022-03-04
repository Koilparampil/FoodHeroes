// app/routes.js
var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql2');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);
connection.connect();
connection.query('USE ' + dbconfig.database);
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/welcomePage', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});
	app.get('/signupFailure', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signupFail.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/welcomePage', // redirect to the secure profile section
		failureRedirect : '/signupFailure', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	app.get('/welcomePage',isLoggedIn, function(req,res){
		res.render('welcomePage.ejs',{
			user: req.user
		});
	});


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// =====================================
	// Google Authentication ===============
	// =====================================
	app.get('/auth/google',
		passport.authenticate('google', {scope: ['email', 'profile']})	
	);
	app.get('/google/callback',
		passport.authenticate('google',{
			successRedirect:'/choosePassword',
			failureRedirect: '/',
		})
	);
	app.get('/choosePassword', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signupG.ejs', { message: req.flash('signupGMessage') });
	});
	app.post('/signupG', function(req,res){
		connection.query(`UPDATE users SET password='${bcrypt.hashSync(req.body.password)}' WHERE username='${req.user.emails[0].value}';`, function(err,rows){if(err){console.error(err)}})
		res.redirect('/welcomePage')
	});

};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	req.user ? next(): res.sendStatus(401);
}
