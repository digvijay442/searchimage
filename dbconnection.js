var mongoose = require('mongoose'),
    db;

 db = mongoose.connect('mongodb://ds117156.mlab.com:17156/dbresults', { useMongoClient: true, user: '', pass: ''} ,(err, database)=>{
    if(err)return console.log(err)
    db = database;
  })

  module.exports = db;

