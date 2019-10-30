
var request = require("request");

var targetCord={};
targetCord.latitude = 53.339428;
targetCord.longitude = -6.257664;
var distnace = 100;


request('https://s3.amazonaws.com/intercom-take-home-test/customers.txt', function (error, response, body) {
    var resultJson = JSON.parse("[" + body.replace(/\n+/g, ",") + "]");
    var p = filterByDistance(resultJson,targetCord,distnace*1000);
    p = p.sort(function(a,b){
        return a.user_id-b.user_id;
    })
    console.log("\n--sorted users with user id within 100km of dublin office--\n");
    for(var i=0;i<p.length;i++){
        console.log("User ID: " + p[i].user_id + ", Name: " + p[i]. name + " , Distance from dublin office : "+ p[i].distance/1000 + "km\n");
    }
});



function filterByDistance(arr, target, distance){
    return arr.map((item)=>{
        // item.latitude;
        // item.longitude;
        // actualDistance = getDistance(target,item);
        item.distance =  getDistance(target,item);
        return item;
    })
    .filter((item)=>item.distance<=distance);
}

function convertToRadians(degrees){
	var radians =  degrees * (Math.PI)/180
	return radians;
}

function getDistance(from,to){
    var earthRadius = 6371000;
    var p1 = convertToRadians(from.latitude);
    var p2 = convertToRadians(to.latitude);
    var angle1 = convertToRadians(to.latitude-from.latitude);
    var angle2 = convertToRadians(to.longitude-from.longitude);

    var d = Math.sin(angle1/2) * Math.sin(angle1/2) + Math.cos(p1) * Math.cos(p2) * Math.sin(angle2/2) * Math.sin(angle2/2);
    var final = 2 * Math.atan2(Math.sqrt(d), Math.sqrt(1-d));

    return (earthRadius * final);

}


// var newD={};
// newD.latitude=52.986375;
// newD.longitude=-6.043701;
// console.log("distance-" +getDistance(targetCord,newD));



