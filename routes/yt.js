var express = require('express');
var router = express.Router();
var path = require('path');
var fetch = require('node-fetch');
var environment = require('dotenv').config({ path: './etc/secrets/process.env' })


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


//Defining URLS for youtube v3 data api
var videoViewApiUrl = "https://www.googleapis.com/youtube/v3/videos";
var subscriberCountApiUrl = "https://www.googleapis.com/youtube/v3/channels";

router.get("/api/v2/:videoId", (req, res, next) => {
  let apiKey = getApiKey();
  let idParam = "?id=" + req.params["videoId"];
  let keyParam = "&key=" + apiKey;
  let partParam = "&part=" + "snippet,statistics"
  let finalParamString = idParam + keyParam + partParam;
  fetch(videoViewApiUrl + finalParamString, {
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
