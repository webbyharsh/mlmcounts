var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/',(req,res)=>{
    var query=req.query.un;
    if(query==""||req.query.un==null){
        res.render('instagram-home');
      }
        else{
          res.render('insta-show');
        }
});


module.exports=router;