var t_user=window.location.search.split('?username=')[1];
var user,followers,following,p_img_link,t_id,tst,t_tweets,t_following,t_des;
var d;
var apiv2=window.location.origin+"/twitter/api/v2/?name="+t_user;
// var api=window.location.origin+"/twitter/api/?name="+t_user;
var api = apiv2;




$(document).ready(function(){
    changeActiveLink();
    console.log('gsgdffg');
   user=$("#t_user");
   console.log(window.location.origin+"/twitter/api/?name="+t_user);
 followers=$("#t_followers");
 following=$("#t_following");
 p_img_link=$("#t_profile_img");
 t_id=$("#t_id");
 tst=$("#tst");
 t_tweets=$("#t_tweets");
 t_following=$("#t_following");
 t_des=$("#t_des");
    //console.log(t_user);
    var api_endpoint="http://localhost:3000/twit/api/?name="+t_user;
    $.get(api,(data)=>{
        console.log(data);
        data = data.data;
        var d1=data.name;
        var d2=data.public_metrics.followers_count;
        var d3=data.profile_image_url;
        var d4=data.name;
        var d5=data.public_metrics.following_count;
        var d6=data.public_metrics.tweet_count;
        var d7=data.description;
        document.title=d4+"-Live Twitter follower count by MLM counts"
        setData(d1,d2,d3,d4,d5,d6,d7);
        d=data;
        //tst.text(parseInt(d2));
        
        //od.update(d.followers_count);


        

    });

    

setInterval(function(){
    // var api_endpoint="http://localhost:3000/twit/api/?name="+t_user;
    $.get(api,(data)=>{
        //console.log(data);
        data = data.data;

        var d1=data.name;
        var d2=data.public_metrics.followers_count;
        var d3=data.profile_image_url;
        var d4=data.name;

        //setData(d1,d2,d3,d4);
        document.getElementById('t_followers').innerHTML=data.followers_count;

    });
},10000);

});


function changeActiveLink(){
    $("#twitter-home").addClass('active');
    $("#youtube-home").removeClass('active');
    console.log('test');

}


function setData(d1,d2,d3,d4,d5,d6,d7){
    //console.log(d1+d2+d3+d4)
    user.html(d1);
    followers.text(d2);
    p_img_link.attr("src",d3);
    t_id.html("@"+d4);
    t_tweets.text(retAggregate(d6));
    t_following.text(retAggregate(d5));
    t_des.text(d7);
}

function retAggregate(number){
    // var output = [];
    // var sNumber = number.toString();
    var unit="";
    var num=0;

    // for (var i = 0, len = sNumber.length; i < len; i += 1) {
    //     output.push(+sNumber.charAt(i));
    // }

    if(number>=0&&number<=999){
        unit="";
        num=number/1;
    }
    else if(number>=1000&&number<=999999){
        unit="K";
        num=(number/1000).toPrecision(3);
    }
    else if(number>=1000000&&number<=999999999){
        unit="M";
        num=(number/1000000).toPrecision(3);
    }
    else if(number>=1000000000){
        unit="B";
        num=(number/1000000000).toPrecision(3);
    }
    return num+unit;

}