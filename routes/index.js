var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test');
});
router.get('/privacy-policy',(req,res)=>{
  res.render("privacy");
  //res.send("FFKJFHSJLF");
})

module.exports = router;
