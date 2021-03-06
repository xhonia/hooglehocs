const express = require('express');
//importing node modules
var router = require('./routes/routes');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');


//connecting to db
var connect = process.env.MONGODB_URI;
var REQUIRED_ENV = "SECRET MONGODB_URI".split(" ");
REQUIRED_ENV.forEach(function(el) {
  if (!process.env[el]){
    console.error("Missing required env var " + el);
    process.exit(1);
  }
});
mongoose.connect(connect);
//importing other local files
var models = require('./models');
var routes = require('./routes/routes');
var auth = require('./routes/auth');
//starting express
const app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(bodyParser.json())
// Example route
app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  models.User.findById(id, done);
});
// passport strategy
passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
  models.User.findOne({ username: username }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.log('Error fetching user in LocalStrategy', err);
      return done(err);
    }
    // if no user present, auth failed
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    // if passwords do not match, auth failed
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    // auth has has succeeded
    return done(null, user);
  });
}
));
app.use('/', auth(passport));
app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');//unfound goes here
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

io.on('connection', function (socket) {

  socket.on('grabfile', function (data) {
    console.log(data);
    models.Document.findById({ _id: data.docid }, function (err, doc) {
      // if there's an error, finish trying to authenticate (auth failed)
      console.log('DOOOOOC', doc);
      if (err) {
        console.log('Error fetching doc', err);
        socket.emit('errid', {err: err})
        return done(err);
      } else if(!doc){
        console.log('not Found ')
      } else {
        console.log('HEEER', doc);
        socket.emit('suc', {doc: doc.content})
      }
  });
});
})


server.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!')
})
