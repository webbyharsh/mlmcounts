var express = require('express');
var router = express.Router();
var path = require('path');
const fetch = require('node-fetch');

var environment = require('dotenv').config()





router.get('/',(req,res,next)=>{
    var query=req.query.username;
    if(query==""||req.query.username==null){
        res.render('twitter-home');
      }
        else{
          res.render('twitter-live-show');
        }
    
});

router.get('/api/',(req,res,next)=>{
    var username=req.query.name;
    var paramss={screen_name:username};
    client.get("2/users/show",paramss,function(err,tweet,response){
        if(!err){
            res.send(tweet);
        }else{
            res.send(err);
        }
    })
})

router.get('/api/v2', (req, res, next) => {

  let username = req.query.name;
  let url = 'https://api.twitter.com/2/users/by/username/' + username + '?user.fields=public_metrics,verified,profile_image_url,description';
  fetch(url, {
    method: "get",
    headers: {'Authorization': 'Bearer ' + process.env.TWITTER_BEARER_TOKEN}
  }).then((data) => {
    data.json()
    .then((dataInJson) => {
      res.send(dataInJson)
    })
    .catch((err) => {
      console.log(err);
    })
  }).catch((err) =>{
    console.log("error is "  + err);
  })
})


module.exports=router;