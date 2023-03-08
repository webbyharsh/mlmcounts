var vq=window.location.search.split('?search=')[1];


$(document).ready(()=>{
    console.log(vq);
    if(validateVideoId(vq)){
        window.location.href = window.location.protocol + "//" + window.location.host + "/live-view-count/" + vq;
    }else{
        window.alert("Video ID is not valid");
        window.location.href = window.location.protocol + "//" + window.location.host;

    }
    // // var rh=$("#search_results");
    // // var http="https://www.googleapis.com/youtube/v3/search?part=snippet&&maxResults=15&q="+vq+"&key=AIzaSyBGsYfqDVnCW291wVJfc-h3QN89pe9q-k4";
    // // $.get(http,(data)=>{
    // //     console.log(data);
    // //     var items=data.items.length;
    // //     for(var i=0;i<items;i++){
    // //         var title=data.items[i].snippet.title;
    // //         var thumbnail=data.items[i].snippet.thumbnails.default.url;
    // //         var time=data.items[i].snippet.publishedAt;
    // //         var type=data.items[i].id.kind;
    // //         var link=data.items[i].id.videoId;
    // //         var channelName=data.items[i].snippet.channelTitle;

    // //         if(type=='youtube#video'){
    // //             var when=[];
    // //             when=getTimePassed(time);
    // //            var container="<div class='stats-2 block d-flex'>";
    // //            var image="<img style='padding:10px;margin-right:10px' src='"+thumbnail+"' />"
    // //            var context="<div><h4><a href='"+link+"'>"+title+"</a></h4>";
    // //            var info="<br><p>Uploaded by "+channelName+" "+when[0]+" "+when[1]+" ago</p></div>";
    // //            var end="</div>"
    // //            rh.append(container+image+context+info+end);
    // //         }
    // //     }

    // })

})

function validateVideoId(videoId){
    let length = videoId.length;
    if(length == 11 && !videoId.includes(" ")){
        return true;
    }else{
        return false;
    }
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