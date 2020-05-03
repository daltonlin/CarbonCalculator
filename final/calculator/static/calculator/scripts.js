function myNavbar() {
  var x = document.getElementById("Topnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
};


function unitConverter() {
  var unit = document.getElementById("basic-addon2").value;
  var num = document.getElementById("inputDistance").value;

  if (unit === 'miles') {
    carbonConverter(num)}
  if (unit === 'km'){
    var newNum = num * 0.621371;
    carbonConverter(newNum)
  }
};

function carbonConverter(valNum) {
    var x = valNum;

    if (0<x<300){
        document.getElementById("outputCarbon").innerHTML = Math.round(x * 0.225);
    }
    if (x>=300 & x<2300){
        document.getElementById("outputCarbon").innerHTML = Math.round(x * 0.136);
    }
    if (x>=2300) {
        document.getElementById("outputCarbon").innerHTML = Math.round(x * 0.166);
    }
    if (x<0) {
       document.getElementById("outputCarbon").innerHTML = 0;
    }
};


function getLocData() {
    var departure_choice = document.getElementById("departure-choice").value;
    var lat1= document.querySelector("#departure-options"  + " option[value='" + departure_choice+ "']").dataset.lat1;
    var lon1= document.querySelector("#departure-options"  + " option[value='" + departure_choice+ "']").dataset.lon1;

    var arrival_choice = document.getElementById("arrival-choice").value;
    var lat2= document.querySelector("#arrival-options"  + " option[value='" + arrival_choice+ "']").dataset.lat2;
    var lon2= document.querySelector("#arrival-options"  + " option[value='" + arrival_choice+ "']").dataset.lon2;

    distance(lat1,lon1,lat2,lon2);
};


function distance(lat1,lon1,lat2,lon2) {
    var R = 6371;
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c * 0.621371;
	document.getElementById("inputDistance").value = Math.round(d);
	carbonConverter(d);
};