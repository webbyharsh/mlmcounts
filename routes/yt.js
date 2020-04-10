var express = require('express');
var router = express.Router();
var path = require('path');


/* GET users listing. */
router.use(express.static(path.join(__dirname, 'public')));

router.get('/',function(req,res,next){
  var query=req.query.search;
  if(query==""||req.query.search==null){
  res.render('youtube-home');
}
  else{
    res.render('youtube-search',{q:query});
  }
});
router.get('/:id', function(req, res, next) {
  res.render('youtube');
});

module.exports = router;
