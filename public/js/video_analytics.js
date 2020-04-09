var video_id=window.location.pathname.split('/yt/')[1];
    
$(document).ready(()=>{
    //var data=getData(video_id);
    $.getJSON("https://www.googleapis.com/youtube/v3/videos?id="+video_id+"&key=AIzaSyBGsYfqDVnCW291wVJfc-h3QN89pe9q-k4&part=snippet,contentDetails,statistics,status",(data)=>{
        //console.log(data);
        //gd=data;
        setVariables(data);
        console.log(data);
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
    $.getJSON("https://www.googleapis.com/youtube/v3/videos?id="+video_id+"&key=AIzaSyBGsYfqDVnCW291wVJfc-h3QN89pe9q-k4&part=snippet,contentDetails,statistics,status",(data)=>{
        updateRealTimeData(data);
    });
}
var page_header="";
var views=0;
var likes=0;
var dislikes=0;
var comments=0;
var liveViewCount;
var liveLikeCount;
var liveDisLikeCount;
var likedislikeratio;
var timevalue;
var timeUploaded;
var timeunit;

function setVariables(data){
    page_header=data.items[0].snippet.title;
    likes=data.items[0].statistics.likeCount;
    views=data.items[0].statistics.viewCount;
    dislikes=data.items[0].statistics.dislikeCount;
    comments=data.items[0].statistics.commentCount;
    timeUploaded=data.items[0].snippet.publishedAt;
    displayData();
}

function displayData(){
    $("#page-header").html(page_header);;
    $("#views").html(retAggregate(views));
    $("#likes").html(retAggregate(likes));
    $("#dislikes").html(retAggregate(dislikes));
    $("#comments").html(retAggregate(comments));
    liveViewCount.html(views);
    liveLikeCount.html(likes);
    liveDisLikeCount.html(dislikes);
    var p1=parseInt(likes)/(parseInt(likes)+parseInt(dislikes));
    likedislikeratio.html((p1*100).toPrecision(3)+"%");
    $("#ldrb").css('width',(p1*100)+"%");
    var t=[];
    t=getTimePassed(timeUploaded);
    timevalue.html(t[0]);
    timeunit.html(t[1]+" ago");
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
},15000);

setInterval(function(){
    $.getJSON("https://www.googleapis.com/youtube/v3/videos?id="+video_id+"&key=AIzaSyBGsYfqDVnCW291wVJfc-h3QN89pe9q-k4&part=snippet,contentDetails,statistics,status",(data)=>{
        //console.log(data);
        //gd=data;
        setVariables(data);
        //console.log(data);
    });
},45000);

function updateRealTimeData(data){
    liveViewCount.html(data.items[0].statistics.viewCount);
    liveLikeCount.html(data.items[0].statistics.likeCount);
    liveDisLikeCount.html(data.items[0].statistics.dislikeCount);
    var l=data.items[0].statistics.likeCount;
    var d=data.items[0].statistics.dislikeCount;
    var p=((parseInt(l)*100/(parseInt(d)+parseInt(l))));
    likedislikeratio.html(p.toPrecision(3)+"%");
    $("#ldrb").css('width',p+"%");
    var t=[];
    t=getTimePassed(timeUploaded);
    timevalue.html(t[0]);
    timeunit.html(t[1]+" ago");
}

function getTimePassed(date_string){
    var date1=new Date(date_string);
    var unit="";
    var date2=new Date();
    var d1=date1.getTime();
    var d2=date2.getTime();
    var diff=d2-d1;
    if(diff<=60*1000){
        unit="seconds";
        diff=diff/1000;
    }
    else if(diff<=60*60*1000){
        unit="minutes";
        diff=diff/(60*1000);
    }
    else if(diff<=3600*1000*24){
        unit="hours";
        diff=diff/(3600*1000);
    }
    else if(diff<=7*1000*3600*24){
        unit="days";
        diff=diff/(1000*24*3600);
    }
    else if(diff<=31*1000*3600*24){
        unit="weeks";
        diff=diff/(7*1000*3600*24);
    }
    else if(diff<=3600*1000*365*24){
        unit="months";
        diff=diff/(1000*3600*24*31);
    }
    else if(diff>3600*1000*365*24){
        unit="years";
        diff=diff/(1000*3600*24*365);
    }
    return [diff.toPrecision(2),unit];
}