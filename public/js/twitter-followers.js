var t_user=window.location.search.split('?username=')[1];
var user,followers,following,p_img_link,t_id,tst;
var d;

$(document).ready(function(){
   user=$("#t_user");
 followers=$("#t_followers");
 following=$("#t_following");
 p_img_link=$("#t_profile_img");
 t_id=$("#t_id");
 tst=$("#tst");
    //console.log(t_user);
    var api_endpoint="http://localhost:3000/twit/api/?name="+t_user;
    $.get(api_endpoint,(data)=>{
        console.log(data);
        var d1=data.name;
        var d2=data.followers_count;
        var d3=data.profile_image_url_https;
        var d4=data.screen_name;
        setData(d1,d2,d3,d4);
        d=data;
        //tst.text(parseInt(d2));
        
        //od.update(d.followers_count);
document.getElementById("tst").innerHTML=d.followers_count;

    });

    

setInterval(function(){
    var api_endpoint="http://localhost:3000/twit/api/?name="+t_user;
    $.get(api_endpoint,(data)=>{
        //console.log(data);
        var d1=data.name;
        var d2=data.followers_count;
        var d3=data.profile_image_url_https;
        var d4=data.screen_name;
        //setData(d1,d2,d3,d4);
        document.getElementById('t_followers').innerHTML=data.followers_count;
    });
},10000);

});



function setData(d1,d2,d3,d4){
    //console.log(d1+d2+d3+d4)
    user.html(d1);
    followers.text(d2);
    p_img_link.attr("src",d3);
    t_id.html("@"+d4);
}