var express = require('express');
var router = express.Router();
var models = require('../models');

module.exports = function(passport) {

  // GET registration page
  // router.get('/register', function(req, res) {
  //   console.log('SINGUP');
  // });

  router.post('/register', function(req, res) {
    // validation step
    // if (req.body.password!==req.body.passwordRepeat) {
    //   //how to alert
    //   // return res.render('signup', {
    //   //   error: "Passwords don't match."
    //   // });
    // }
    console.log(req.body)
    var u = new models.User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });
    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).send('ERR');
        return;
      }
      console.log('USER SAVED', user);
      res.send('welcome');
    });
  });

  // GET Login page
  // router.get('/login', function(req, res) {
  //   res.render('login');
  // });
  //
  // POST Login page
  router.post('/login', passport.authenticate('local',{
    successRedirect: '/protected',
    failureRedirect: '/login'
  }));

  // // GET Logout page
  // router.get('/logout', function(req, res) {
  //   req.logout();
  //   res.redirect('/');
  // });

  return router;
};
