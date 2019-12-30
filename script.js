//Variable Creation
var tempCurrent = 0;
var date = "todays date";
var location = "everywhere";
var humidityCurrent = 0;
var windCurrent = 0;
var UVCurrent = 0;
//Function Creation

//Function for when the search is used
function searchEnter () {

}

//Function to populate current data to jumbotron
function jumboPop() {
    $("#tempCurrent").text("Temperature: " + tempCurrent);
    $("#locationCurrent").text(Location + "(" + date + ")");
    $("#humidCurrent").text("Humidity: " + humidityCurrent);
    $("#windCurrent").text("Wind Speed: " + windCurrent);
    $("#UVCurrent").text("UV Index: " + UVCurrent);
}

//Function to populate side bar of saved cities
function sidePop() {

}

//Function for when city on sidebar is clicked
function sideClick () {

}

//Function Call outs
jumboPop();