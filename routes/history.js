var express = require('express');
var router = express.Router();
var db = require('../dbconnection');
// var mongoose = require('mongoose'),
// db;

// mongoose.connect('mongodb://ds117156.mlab.com:17156/dbresults', { useMongoClient: true, user: '840340', pass: '840340'} ,(err, database)=>{
//   if(err)return console.log(err)
//   db = database;
// })


router.get('/', function(req, res, next) {
    var searchKeywords = [];
    db.collection('searchResults').find().toArray( (err, results) => {
        results.forEach(function(data, index){
            // searchKeywords = data.searchKeyword
            // console.log(data.searchKeyword)
            searchKeywords.push(data.searchKeyword);
        })
        console.log(searchKeywords)
        res.render('history',{searchKeywords: searchKeywords, page_name: 'history'});
    })
    // res.send('ok')
  });

  module.exports = router;