var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }]
});

var documentSchema =  mongoose.Schema({
  title: String,
  date: Object,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]

})

// var meetingSchema =  mongoose.Schema({
//   subject: String,
//   date: String,
//   time: String,
//   invitees: Array,
//   location: String,
//   length: String,
//   created: String,
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   channel: String
// })


User = mongoose.model('User', userSchema);
Document = mongoose.model('Document', reminderSchema);

module.exports = {
  User: User,
  Document:Document

};
