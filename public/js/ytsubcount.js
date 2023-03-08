var banner;
var subs;
var t_views;
var uploads;
var n;
var propic;
var key="&key=";//Key removed from here as it is not required for search
var s_initial="https://www.googleapis.com/youtube/v3/search?part=snippet&&maxResults=40&q="
var channelID=window.location.pathname.split("/live-sub-count/")[1];

document.title="YouTube live subscriber count by MLM counts"

var keywords="live sub count,youtube live sub count,youtube live subscriber count,live count,livecounts,count,youtube,youtube live,realtime"
$("meta[name=keywords]").attr('content',keywords);
var $meta = $('meta[name=description]').attr('content', 'Easiest way to get live sub count for any youtube channel out there. Just enter the name of the channel and you can see live sub count for that channel. ');

$(document).ready(function (){
    banner=document.getElementById("hbanner");
    propic=document.getElementById("hprofile");
    t_views=document.getElementById("hviews");
    uploads=document.getElementById("huploads");
    subs=document.getElementById("hsubs");
    n=document.getElementById("cname");

    if(window.location.pathname.split("/live-sub-count")[1]==""){
        window.location.href="/live-sub-count/UC-lHJZR3Gqxm24_Vd_AJ5Yw";
    }

    if(channelID.length==24){
        showChannel();
    }else{
        location.replace("UC-lHJZR3Gqxm24_Vd_AJ5Yw");
    }

   

    $("#s1").click(function(){
        var a=$("#input_q").val();
        $("#channel_search").html("");
        //console.log(a);
        $.get(s_initial+a+key,(data)=>{
           // console.log(data);
            
            var channels=[];
            for(var k=0;k<data.items.length;k++){
                if(data.items[k].id.kind=="youtube#channel"){
                    channels.push(data.items[k].snippet);
                }
            }
            console.log(channels);
            for(var m=0;m<channels.length;m++){
                var p;
                var t;
                var id;
                p=channels[m].thumbnails.default.url;
                t=channels[m].title;
                id=channels[m].channelId;
                var container="<div class='d-flex'>";
                var img_c="<img src='"+p+"' />";
                var title="<a href='/live-sub-count/"+id+"'><h4>"+t+"</h4></a>";
                $("#channel_search").append(container+img_c+title+"</div>");

            }
        });
    })

});

var channelinitial="https://www.googleapis.com/youtube/v3/channels?part=brandingSettings%2Csnippet%2Cstatistics&id=";
var f="https://www.googleapis.com/youtube/v3/channels?part=statistics&id=";


function showChannel(){
    var apiCallUrl = window.location.protocol + "//" + window.location.host + "/live-sub-count/api/v2/";
    $.get(apiCallUrl + channelID,(data)=>{
        console.log(data);
        var p=data.items[0].snippet.thumbnails.default.url;
        var t=data.items[0].snippet.title;
        var is=data.items[0].statistics.subscriberCount;
        var iv=data.items[0].statistics.viewCount;
        var iu=data.items[0].statistics.videoCount;
        var ib=data.items[0].brandingSettings.image.bannerExternalUrl;
        // banner.attr("src",ib);
        banner.setAttribute("src",ib);
        // propic.attr("src",p);
        propic.setAttribute("src",p);
        subs.innerHTML=is;
        t_views.innerHTML=numberWithCommas(iv);
        uploads.innerHTML=numberWithCommas(iu);
        n.innerHTML=t;
    })
    setInterval(function(){
        $.get(f+channelID+key,(data)=>{
            subs.innerHTML= data.items[0].statistics.subscriberCount;
        });
    },60000)
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}