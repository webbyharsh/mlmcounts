var express = require('express');
var router = express.Router();
var path = require('path');
var Twitter=require('twitter');

var accesstoken="1005134180135550976-jZjl1dX8AwH9Z401iZqCbIBwHnyoWP";
var accesstokensecret="ZV61Bc7OlZKaCjJKOzZ7Tbl3NOWvkanuCIJAUiSW6W6LT";
var apikey="cgQNKb1yCW9Kv5vkwlJ28LD9O";
var apisecretkey="SwDgcHW6VIvN1K50PAwI5NaWjA182llWfAkFJjFJdKKxWmsENL";

var client = new Twitter({
  consumer_key: apikey,
  consumer_secret: apisecretkey,
  access_token_key: accesstoken,
  access_token_secret: accesstokensecret
});

var users_param={screen_name:"narendramodi"};

router.get('/',(req,res,next)=>{
    ///res.render('twitter-home');
    //console.log(client);
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
    client.get("users/show",paramss,function(err,tweet,response){
        if(!err){
            res.send(tweet);
        }else{
            res.send(err);
        }
    })
})


module.exports=router;