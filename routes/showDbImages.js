var express = require('express');
var router = express.Router(),
    // mongoose = require('mongoose'), db,  
    page_name = '';
    var db = require('../dbconnection');
    // mongoose.connect('mongodb://ds117156.mlab.com:17156/dbresults', { useMongoClient: true, user: '840340', pass: '840340'} ,(err, database)=>{
    //     if(err)return console.log(err)
    //     db = database;
    // })

/* GET users listing. */
router.get('/:value', function(req, res, next) {
    var searchKey = req.params.value, 
        dbResults, 
        searchKey;
    db.collection('searchResults').find({"searchKeyword":searchKey}).toArray( (err, results) => {
        results.forEach(function(data, index){
            searchKey = data.searchKeyword
            dbResults = data.searchResults
        })
        res.render('showDbImages',{dbResults:dbResults, searchKey: searchKey, page_name: 'history'})
    } )
});

module.exports = router;
