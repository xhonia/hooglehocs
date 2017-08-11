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

  // console.log("req.user?", req.user);
  Document.findById(req.user._id, function(err, dock){
    if (err){
      console.log("error in doc find");
    } else if (!dock){
        var doc = new Document({
          title: req.body.title,
          date: req.body.date,
          author: req.user._id,
          content: req.body.content
        })
        doc.save(function(err, doc) {
          if (err) {
            console.log("xhonia",err);
            res.status(500).send('ERR');
            return;
          }
          console.log('doc SAVED', doc);
          res.send('created');
        });
    } else{
      console.log("dock in else", dock);
      dock.title= req.body.title,
      dock.content=req.body.content,
      dock.save(function(err,doc){
        if (err){
          console.log("robinson",err);
          res.status(500).send('ERR');
          return;
        } else {
          console.log('doc UPDATED', doc);
          res.send('updated');
        }

      })
    }
  })
  // var user = User.findById(req.user._id)
  // console.log("user", user);

  // user.documents.push(doc)
  // user.save(function(err,user){
  //   if (err){
  //     console.log("user docs not updated");
  //   } else{
  //     console.log("user updated", user);
  //   }
  // })
})
router.get('/doclist', function(req, res){
  console.log("getting list for cdm");
  Document.find({author: req.user._id}, function(err,docs){
    if (err){
      console.log("doclist find err",err);
    } else {
      console.log("docs:",docs);
      res.send(docs)
    }
  })
  // console.log("array of docs? or objects?", Doc);
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
