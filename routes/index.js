var express = require('express');
var router = express.Router();
var Scraper = require ('images-scraper'),
    google = new Scraper.Google(),
    // mongoose = require('mongoose'), db,
     page_name = 'index';
    var db = require('../dbconnection');

// mongoose.connect('mongodb://ds117156.mlab.com:17156/dbresults', { useMongoClient: true, user: '840340', pass: '840340'} ,(err, database)=>{
//       if(err)return console.log(err)
//       db = database;
//   })

/* GET home page. */
router.get('/', function(req, res, next) {
  var imgs = [];
  res.render('index', { title: 'Express', imgs: imgs, page_name:page_name });
});

router.post('/',function(req, res){
  var keyword = req.body.searchKeyword.trim().charAt(0).toUpperCase() + req.body.searchKeyword.trim().substr(1).toLowerCase();
google.list({
    keyword: keyword,
    num: 15,
    rlimit: '10',
    timeout: 100,
     detail: false,
    nightmare: {
        show: false
    }
})
.then(function (response) {
  var imgs = response,
  imgsUrls = imgs.map(value => value.url);
  var data = {
    searchKeyword: keyword,
    searchResults: imgsUrls
  }
   console.log(imgsUrls)

   res.render('index',{title: 'Express', imgs: imgs, page_name: page_name})

   db.collection('searchResults').find({searchKeyword : data.searchKeyword}).toArray( (err, result) =>{
     if(err) throw err;
     else if( result.length == 0 ){
      console.log('----------Save result--------')
       db.collection('searchResults').save(data, ()=> console.log('saved to DB'))
     }
     else {
       db.collection('searchResults').findOneAndUpdate({searchKeyword : data.searchKeyword}, {
        $set: {
          searchResults: data.searchResults
        }
      }, (err, results) => {
        console.log('----------Update result--------')
        console.log('database has been udpated for search Key - '+ data.searchKeyword)
      })
     }
   } )

}).catch(function(err) {
    console.log('err', err);
})
// console.log(imgs)
    // res.send(imgs)
})

module.exports = router;
