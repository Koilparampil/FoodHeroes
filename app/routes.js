// app/routes.js
var bcrypt = require("bcrypt-nodejs");
var mysql = require("mysql2");
var dbconfig = require("../config/database");

var connection = mysql.createConnection(dbconfig.connection);
connection.connect();
connection.query("USE " + dbconfig.database);
module.exports = function (app, passport) {
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get("/", function (req, res) {
    res.render("index.ejs"); // load the index.ejs file
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get("/login", function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/welcomePage", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    }),
    function (req, res) {
      console.log("hello");

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect("/");
    }
  );

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get("/signup", function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });
  app.get("/signupFailure", function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render("signupFail.ejs", { message: req.flash("signupMessage") });
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/welcomePage", // redirect to the secure profile section
      failureRedirect: "/signupFailure", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

<<<<<<< HEAD
  // =====================================
  // Logged In SECTION =========================
=======

  // =====================================
  // PROFILE SECTION =========================
>>>>>>> f785d8a2f0f2a9ea6a184bdd3939eeedce39002d
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get("/profile", isLoggedIn, function (req, res) {
    res.render("profile.ejs", {
      user: req.user, // get the user out of session and pass to template
    });
<<<<<<< HEAD
    //console.log(req.user)
  });
  app.get("/welcomePage", isLoggedIn, function (req, res) {
    connection.query(
      `SELECT password FROM users WHERE username = '${req.user.username}'`,
      function (err, rows) {
        if (err) throw error;
        //console.log(rows[0].password)
        req.session.passport.user.password = rows[0].password;
        res.render("welcomePage.ejs", {
          user: req.user,
        });
      }
    );
  });
  app.get("/RestaurantTracker", isLoggedIn, async function (req, res) {
    let restaurantData = await connection
      .promise()
      .query(`SELECT * FROM restaurants WHERE user_id = ${req.user.id}`);
    //console.log(restaurantData[0]);
    let hasBeen = [];
    let want2Go = [];
    restaurantData[0].forEach((item) =>
      item.has_been === 1 ? hasBeen.push(item) : want2Go.push(item)
    );
    //console.log(hasBeen);
    //console.log(want2Go);
    res.render("resTracker.ejs", {
      user: req.user,
      want2Go: want2Go,
      hasBeen: hasBeen,
    });
  });
=======
  });

  app.get("/aboutus", function (req, res) {
    res.render("aboutus.ejs", {
      user: req.user, // get the user out of session and pass to template
    });
  });
	// =====================================
	// Logged In SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
		//console.log(req.user)
	});
	app.get('/welcomePage',isLoggedIn, function(req,res){
		connection.query(`SELECT password FROM users WHERE username = '${req.user.username}'`, function(err,rows){
			if (err) throw error;
			//console.log(rows[0].password)
			req.session.passport.user.password=rows[0].password
			res.render('welcomePage.ejs',{
				user: req.user
			});
		});
	});
	app.get('/RestaurantTracker',isLoggedIn, async function(req,res){
		let restaurantData= await connection.promise().query(`SELECT * FROM restaurants WHERE user_id = ${req.user.id}`)
		//console.log(restaurantData[0]);
		let hasBeen=[]
		let want2Go=[]
		restaurantData[0].forEach((item)=> item.has_been===1 ? hasBeen.push(item):want2Go.push(item))
		//console.log(hasBeen);
		//console.log(want2Go);
		res.render('resTracker.ejs',{
			user: req.user,
			want2Go: want2Go,
			hasBeen: hasBeen
		});
	})
>>>>>>> f785d8a2f0f2a9ea6a184bdd3939eeedce39002d

  app.get("/welcomePage", isLoggedIn, function (req, res) {
    res.render("welcomePage.ejs", {
      user: req.user,
    });
    //console.log(req.user)
  });
  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

<<<<<<< HEAD
  // =====================================
  // Google Authentication ===============
  // =====================================
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );
  app.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: "/choosePassword",
      failureRedirect: "/",
    })
  );
  app.get("/choosePassword", function (req, res) {
    // render the page and pass in any flash data if it exists
    //console.log(req.user)
    connection.query(
      `SELECT password FROM users WHERE username = '${req.user.username}'`,
      function (err, rows) {
        if (err) throw error;
        //console.log(rows[0].password)
        if (!(rows[0].password === null)) {
          console.log("theres already a Password");
          res.redirect("/welcomePage");
        } else {
          res.render("signupG.ejs", { message: req.flash("signupGMessage") });
        }
      }
    );
  });
  app.post("/signupG", function (req, res) {
    //console.log(req)
    connection.query(
      `UPDATE users SET password='${bcrypt.hashSync(
        req.body.password
      )}' WHERE username='${req.user.username}';`,
      function (err, rows) {
        if (err) {
          console.error(err);
        }
      }
    );
    res.redirect("/welcomePage");
  });
=======
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
		//console.log(req.user)
		connection.query(`SELECT password FROM users WHERE username = '${req.user.username}'`, function(err,rows){
			if (err) throw error;
			//console.log(rows[0].password)
			if(!(rows[0].password===null)){
				console.log("theres already a Password")
				res.redirect('/welcomePage')
			}else{
				res.render('signupG.ejs', { message: req.flash('signupGMessage') });
			}
		})
	});
	app.post('/signupG', function(req,res){
		//console.log(req)
		connection.query(`UPDATE users SET password='${bcrypt.hashSync(req.body.password)}' WHERE username='${req.user.username}';`, function(err,rows){if(err){console.error(err)}})
		res.redirect('/welcomePage')
	});
>>>>>>> f785d8a2f0f2a9ea6a184bdd3939eeedce39002d



// route middleware to make sure
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
