function myNavbar() {
  var x = document.getElementById("Topnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


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

function carbonConverter(valNum) {
    var x = valNum;

    if (x<300){
        document.getElementById("outputCarbon").innerHTML = Math.round(x * 0.225);
    }
    if (x>=300 & x<2300){
        document.getElementById("outputCarbon").innerHTML = Math.round(x * 0.136);
    }
    if (x>=2300) {
        document.getElementById("outputCarbon").innerHTML = Math.round(x * 0.166);
    }
}