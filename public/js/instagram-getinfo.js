var username="";
var title;
var followers;
var following;
var posts;
var profilepic;
var id;
var link="https://instagram.com/";
var end="?__a=1";
var username=window.location.search.split("?un=")[1];
$(document).ready(function(){
    followers=$("#followers");
    following=$("#following");
    posts=$("#posts");
    title=$("#title");
    profilepic=$("#profilepic");
    id=$("#username");
    getJsonData();
    
});

function getJsonData(){
    $.get(link+username+end,(data)=>{
        console.log(data);
    setUserData(data);
    });
}

function setUserData(data){
    var t=data.graphql.user.full_name;
    var f=data.graphql.user.edge_followed_by.count;
    var url=data.graphql.user.profile_pic_url_hd;
    var ff=data.graphql.user.edge_follow.count;
    document.getElementById("followers").innerHTML=f;
    title.html(t);
    profilepic.attr("src",url);
    id.html(username);
document.getElementById("following").innerHTML=ff;
}
setInterval(()=>{
    getJsonData();
},5000)