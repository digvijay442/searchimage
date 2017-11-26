var express = require('express'),
    router = express.Router(),
    page_name = '',
    db = require('../dbconnection');

/* GET users listing. */
router.get('/:value', function(req, res, next) {
    var searchKey = req.params.value, 
        dbResults;
    db.collection('searchResults').find({"searchKeyword":searchKey}).toArray( (err, results) => {
        results.forEach(function(data, index){
            searchKey = data.searchKeyword
            dbResults = data.searchResults
        })
    db.collection
        res.render('showDbImages',{dbResults:dbResults, searchKey: searchKey, page_name: 'history'})
    } )
});

module.exports = router;
