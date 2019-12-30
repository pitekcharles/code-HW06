console.log("crap")
var temp = 0;
var date = "todays date";
var locationCurrent = "everywhere";
var humidity = 0;
var wind = 0;
var UV = 0;
//Function Creation

//Function for when the search is used
function searchEnter() {

}

//Function to populate current data to jumbotron
function jumboPop() {
    $("#tempCurrent").text("Temperature: " + temp);
    $("#locationCurrent").text(locationCurrent + "(" + date + ")");
    $("#humidCurrent").text("Humidity: " + humidity);
    $("#windCurrent").text("Wind Speed: " + wind);
    $("#UVCurrent").text("UV Index: " + UV);
}

//Function to populate side bar of saved cities
function sidePop() {

}

// //Function for when city on sidebar is clicked
function sideClick() {

}

//Function Call outs
jumboPop();