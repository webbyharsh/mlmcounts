var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var environment = require('dotenv').config()
// var path = require('path');
// router.use(express.static(path.join(__dirname, 'public')));


router.get('/',function(req,res,next){
    res.render('ytsubcount');
});
router.get("/:id",function(req,res,next){
    res.render('ytsubcount');
})

//Defining URLS for youtube v3 data api
var videoViewApiUrl = "https://www.googleapis.com/youtube/v3/videos";
var subscriberCountApiUrl = "https://www.googleapis.com/youtube/v3/channels";

router.get("/api/v2/:channelId", (req, res, next) => {
  let apiKey = getApiKey();
  let idParam = "?id=" + req.params["channelId"];
  let keyParam = "&key=" + apiKey;
  let partParam = "&part=" + "snippet,statistics,brandingSettings"
  let finalParamString = idParam + keyParam + partParam;
  fetch(subscriberCountApiUrl + finalParamString, {
    method: 'get'
  })
  .then((rawResponse) => {
    rawResponse.json().then((json) => {
      if(validateJson(json)){
        //DO nothing
      }else{
        console.log("(****FAILED WITH API KEY****** " + apiKey);
      };
      res.send(json);
    })
  }).catch((err) => {
    console.log("Error in yt api " + err);
  })
})


/**
 * This method gets random api key from the list of api keys
 */
function getApiKey(){
    let apiKeyAsString = process.env.YOUTUBE_API_KEY;
    let apiKeyArray = apiKeyAsString.split(",");
    let size = apiKeyArray.length;
    let randomIndex = Math.floor(Math.random() * size);
    return apiKeyArray[randomIndex];
  }
  
  function validateJson(data){
    if(data.error != null){
      console.log("==ERROR== " + JSON.stringify(data.error));
      return false;
    }
    return true;
  }
module.exports = router;
