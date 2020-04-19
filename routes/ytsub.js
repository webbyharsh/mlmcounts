var express = require('express');
var router = express.Router();
// var path = require('path');
// router.use(express.static(path.join(__dirname, 'public')));


router.get('/',function(req,res,next){
    res.render('ytsubcount');
});
router.get("/:id",function(req,res,next){
    res.render('ytsubcount');
})

module.exports = router;
