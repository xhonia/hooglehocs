var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;

// Users who are not logged in can see these routes
//
// router.get('/', function(req, res, next) {
//   res.render('home');
// });

///////////////////////////// END OF PUBLIC ROUTES /////////////////////////////

router.use(function(req, res, next){
  if (!req.user) {
    res.redirect('/login');
  } else {
    return next();
  }
});

//////////////////////////////// PRIVATE ROUTES ////////////////////////////////
// Only logged in users can see these routes

router.get('/protected', function(req, res, next) {
  console.log('user reached backend')
  res.send('yo')
  // res.render('protectedRoute', {
  //   username: req.user.username,
  // });
});

///////////////////////////// END OF PRIVATE ROUTES /////////////////////////////

module.exports = router;
