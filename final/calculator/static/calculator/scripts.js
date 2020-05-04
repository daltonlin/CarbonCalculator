/**
 * Mobile-responsive navigation bar.
 *
 * @link layout.html
 */
function myNavbar() {

  var x = document.getElementById("Topnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/**
 * Check unit and convert units.
 *
 * Check the user input unit is km or miles, and forward data only in miles to the carbonConverter() function.
 */
function unitConverter() {

  var unit = document.getElementById("basic-addon2").value;
  var num = document.getElementById("inputDistance").value;

  if (unit === 'miles') {
    carbonConverter(num)}
  if (unit === 'km'){
    var newNum = num * 0.621371;
    carbonConverter(newNum)
  }
}

/**
 * Calculate the carbon footprint based on user input.
 *
 * The formulation is provided by EPA, please check the references page.
 *
 * @param valNum  Travel distance in miles.
 */
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
}

/**
 * Get airport locations information from the dataset based on user input.
 *
 * Get latitude/longitude coordinates based on the user's selected locations.
 */
function getLocData() {

    var departure_choice = document.getElementById("departure-choice").value;
    var lat1= document.querySelector("#departure-options"  + " option[value='" + departure_choice+ "']").dataset.lat1;
    var lon1= document.querySelector("#departure-options"  + " option[value='" + departure_choice+ "']").dataset.lon1;

    var arrival_choice = document.getElementById("arrival-choice").value;
    var lat2= document.querySelector("#arrival-options"  + " option[value='" + arrival_choice+ "']").dataset.lat2;
    var lon2= document.querySelector("#arrival-options"  + " option[value='" + arrival_choice+ "']").dataset.lon2;

    distance(lat1,lon1,lat2,lon2);
}

/**
 * Calculate the travel distance in miles based on user input.
 *
 * The formulation is provided by Movable Type Ltd., please check the references page.
 *
 * @param latitude of the departure location.
 * @param longitude of the departure location.
 * @param latitude of the arrival location.
 * @param longitude of the arrival location.
 */
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
	document.getElementById("basic-addon2").value = 'miles';
	carbonConverter(d);
}

/**
 * Send data to the backend API.
 *
 * Acquire user's input data and send to the backend API.
 */
function saveEntry() {

    // check the unit of the input
    var unit = document.getElementById("basic-addon2").value;
    var num = document.getElementById("inputDistance").value;

    // Convert the unit accordingly
    if (unit === 'miles') {
        d_miles = num ;
        d_km = num * 1.60934;
    };
    if (unit === 'km') {
        d_miles = num * 0.621371;
        d_km = num;
    };

    // Collect user input data
    var data = {
        departure_loc: document.getElementById("departure-choice").value,
        arrival_loc: document.getElementById("arrival-choice").value,
        result: document.getElementById("inputDistance").value,
        distance_miles : Math.round(d_miles),
        distance_km: Math.round(d_km)
    };

   // Send data to API
    fetch('/new',{
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(confirm('This trip has been saved! Go to your profile page to check your travel history'));

}
