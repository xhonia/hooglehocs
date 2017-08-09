var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var Document = models.Document;
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

// router.get('/protected', function(req, res, next) {
//   res.render('protectedRoute', {
//     username: req.user.username,
//   });
// });

router.post('/newdoc', function(req,res){
  console.log("body", req.body);
  console.log("req.user?", req.user);
  var user = User.findById(req.user._id)
  var doc = new Document({
    title: req.body.title,
    data: req.body.date,
    author: user._id
  })
  doc.save(function(err, doc) {
    if (err) {
      console.log(err);
      res.status(500).send('ERR');
      return;
    }
    console.log('doc SAVED', doc);
    res.send('created');
  });
  user.documents.push(doc)
  user.save(function(err,user){
    if (err){
      console.log("user docs not updated");
    } else{
      console.log("user updated", user);
    }
  })
})

router.get('/protected', function(req, res, next) {
  console.log('user reached backend')
  res.send('yo')
  // res.render('protectedRoute', {
  //   username: req.user.username,
  // });
});


///////////////////////////// END OF PRIVATE ROUTES /////////////////////////////

module.exports = router;
