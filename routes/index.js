var express = require('express');
    router = express.Router(),
    Scraper = require ('images-scraper'),
    google = new Scraper.Google(),
    page_name = 'index',
    db = require('../dbconnection');


/* GET home page. */
router.get('/', function(req, res, next) {
  var imgs = [];
  res.render('index', { title: 'Express', imgs: imgs, page_name:page_name });
});

router.post('/',function(req, res){
  var keyword = req.body.searchKeyword.charAt(0).toUpperCase() + req.body.searchKeyword.substr(1).toLowerCase();
google.list({
    keyword: keyword,
    num: 15,
    // rlimit: '10',
    timeout: 1000,
     detail: false,
    nightmare: {
        show: true
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
