var express = require('express'),
    router = express.Router(),
    db = require('../dbconnection');

    /* print search keyword */
router.get('/', function(req, res, next) {
    var searchKeywords = [];
    db.collection('searchResults').find().toArray( (err, results) => {
        results.forEach(function(data, index){
            searchKeywords.push(data.searchKeyword);
        })
        console.log(searchKeywords)
        res.render('history',{searchKeywords: searchKeywords, page_name: 'history'});
    })
    // res.send('ok')
  });

  module.exports = router;