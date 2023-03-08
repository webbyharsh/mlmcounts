var video_id=window.location.pathname.split('/live-view-count/')[1];
var likes_when_loaded;
var dislikes_when_loaded;
var title;
var publishedAt;
//document.title("");

var apiCallUrl = window.location.protocol + "//" + window.location.host + "/live-view-count/api/v2/";
    


var keywords="youtube live view count,youtube view count,youtube realtime views,youtube video view counter,youtube likes counter,youtube live count views,count,youtube,youtube live,realtime"
document.title="YouTube live view count by MLM counts";
$("meta[name=keywords]").attr('content',keywords);

var $meta = $('meta[name=description]').attr('content', 'Free tool to get live view count for a youtube video. Just type in the name of the video and you are good to go. The view count updates every 2 seconds with a added feature of dark mode. You can also get live like and dislike counts.');

$(document).ready(()=>{
    $("#youtube-home").addClass('active');
    $("#twitter-home").removeClass('active');
    //var data=getData(video_id);
    $.getJSON(apiCallUrl + video_id,(data)=>{
        //console.log(data);
        //gd=data;
        setVariables(data);
        console.log(data);
        var p=[];
    p=getTimePassed(data.items[0].snippet.publishedAt, false);
    $("#time-value").text(p[0]);
    $("#time-unit").html(p[1]+" ago");
    y=getTimePassed(data.items[0].snippet.publishedAt, true);
    $("#joinedAt").html(parseInt(y[0]) + y[1]);
    console.log(p);
        likes_when_loaded=data.items[0].statistics.likeCount;
        dislikes_when_loaded=data.items[0].statistics.dislikeCount;
        title=data.items[0].snippet.title;
        publishedAt=data.items[0].snippet.publishedAt;
        $("#realtime-likes-increment").text(0);
        $("#realtime-dislikes-increment").text(0);
        $("#page-header").html(data.items[0].snippet.title);
        document.title=data.items[0].snippet.title+"-live view count from youtube";
        
    });
    $("#lineChart1").css("width","100%");
    $("#lineChart1").css("height","320px");
    $("#lineChart1").attr("src","https://youtube.com/embed/"+video_id);
    liveViewCount=$("#realtime-views");
    liveLikeCount=$("#realtime-likes");
    liveDisLikeCount=$("#realtime-dislikes");
    likedislikeratio=$("#like-dislike-ratio");
    timevalue=$("#time-value");
    timeunit=$("#time-unit");
    

    
});
function getData(video_id){
    var gd;
    $.getJSON(apiCallUrl + video_id,(data)=>{
        updateRealTimeData(data);
    });
}
var page_header="";
var views=0;
var likes=0;
var dislikes=0;
var comments=0;
var timePassed=0;
var liveViewCount;
var liveLikeCount;
var liveDisLikeCount;
var likedislikeratio;
var timevalue;
var timeUploaded;
var timeunit;

function setVariables(data){
    //page_header=data.items[0].snippet.title;
    page_header=title;

    likes=data.items[0].statistics.likeCount;
    views=data.items[0].statistics.viewCount;
    // dislikes=data.items[0].statistics.dislikeCount;
    comments=data.items[0].statistics.commentCount;
    //timeUploaded=data.items[0].snippet.publishedAt;
    timeUploaded=publishedAt;
    displayData();
    
}

function displayData(){
    $("#page-header").html(page_header);;
    $("#views").html(retAggregate(views));
    $("#likes").html(retAggregate(likes));
    // $("#dislikes").html(retAggregate(dislikes));
    $("#comments").html(retAggregate(comments));
    liveViewCount.html(views);
    liveLikeCount.html(likes);
    // liveDisLikeCount.html(dislikes);
    // var p1=parseInt(likes)/(parseInt(likes)+parseInt(dislikes));
    // likedislikeratio.html((p1*100).toPrecision(3)+"%");
    // $("#ldrb").css('width',(p1*100)+"%");
    var t=[];
    t=getTimePassed(timeUploaded, false);
    timevalue.text(t[0]);
    timeunit.html(t[1]+" ago");
    y=getTimePassed(timeUploaded, true);
    $("#joinedAt").html(parseInt(y[0]) + y[1]);
    $("#realtime-likes-increment").text("+"+likes-likes_when_loaded);
    // $("#realtime-dislikes-increment").text("+"+parseInt(dislikes)-parseInt(dislikes_when_loaded));
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

setInterval(function(){
    getData(video_id);
   // updateRealTimeData(data);
},50000);

setInterval(function(){
    $.getJSON(apiCallUrl + video_id,(data)=>{
        //console.log(data);
        //gd=data;
        setVariables(data);
        //console.log(data);
    });
},20000);

function updateRealTimeData(data){
    liveViewCount.html(data.items[0].statistics.viewCount);
    liveLikeCount.html(data.items[0].statistics.likeCount);
    // liveDisLikeCount.html(data.items[0].statistics.dislikeCount);
    var l=data.items[0].statistics.likeCount;
    // var d=data.items[0].statistics.dislikeCount;
    // var p=((parseInt(l)*100/(parseInt(d)+parseInt(l))));
    // likedislikeratio.html(p.toPrecision(3)+"%");
    // $("#ldrb").css('width',p+"%");
    var t=[];
    t=getTimePassed(timeUploaded, false);
    timevalue.html(t[0]);
    timeunit.html(t[1]+" ago");
    y=getTimePassed(timeUploaded, true);
    $("#joinedAt").html(parseInt(y[0]) + y[1]);
}

function getTimePassed(date_string, isShort){
    var date1=new Date(date_string);
    var unit="";
    var date2=new Date();
    var d1=date1.getTime();
    var d2=date2.getTime();
    var diff=d2-d1;
    if(diff<=60*1000){
        unit="seconds";
        if(isShort){
            unit = "s";
        }
        diff=diff/1000;
    }
    else if(diff<=60*60*1000){
        unit="minutes";
        if(isShort){
            unit = "m";
        }
        diff=diff/(60*1000);
    }
    else if(diff<=3600*1000*24){
        unit="hours";
        if(isShort){
            unit = "H";
        }
        diff=diff/(3600*1000);
    }
    else if(diff<=7*1000*3600*24){
        unit="days";
        if(isShort){
            unit = "D";
        }
        diff=diff/(1000*24*3600);
    }
    else if(diff<=31*1000*3600*24){
        unit="weeks";
        if(isShort){
            unit = "W";
        }
        diff=diff/(7*1000*3600*24);
    }
    else if(diff<=3600*1000*365*24){
        unit="months";
        if(isShort){
            unit = "M";
        }
        diff=diff/(1000*3600*24*31);
    }
    else if(diff>3600*1000*365*24){
        unit="years";
        if(isShort){
            unit = "Y";
        }
        diff=diff/(1000*3600*24*365);
    }
    return [diff.toPrecision(2),unit];
}