var temperature = 0;
var date = "todays date";
var locationCurrent = "everywhere";
var humidity = 0;
var wind = 0;
var UV = 0;
var cityAry = ["Denver", "Des Moines", "Moscow"];
var apiKey = "9bd07f7d4ce4fe8a1ea716aadf106115";
//Function Creation

//Function for when the search is used
function searchEnter() {

}

//Function to populate current data to jumbotron
function jumboPop() {
    $("#tempCurrent").text("Temperature: " + temperature + " F");
    $("#locationCurrent").text(locationCurrent + "(" + date + ")");
    $("#humidCurrent").text("Humidity: " + humidity + " %");
    $("#windCurrent").text("Wind Speed: " + wind + " MPH");
    $("#UVCurrent").text("UV Index: " + UV);
}

//Function to populate side bar of saved cities
function sidePop() {
    $("#sidebar").empty();
    cityAry.forEach(function(item){
        var button = $("<button>").attr({"type":"button", "class":"btn btn-secondary"});
        button.text(item);
        button.attr({"data-city" : item});
        $("#sidebar").append(button);
    })
}

// //Function for when city is entered into the input field
function sideClick(event) {
    event.preventDefault();
    console.log(this);
    cityAry.push($("#cityInput").val());
    sidePop();

}

//Function for when the side buttons are clicked to populate
function sideButtonClick(event) {
    console.log(this);
    locationCurrent = $(this).attr("data-city");
    console.log(locationCurrent);
    jumboPop();
    pullCityInfo();
}

//function to make ajax calls for a city
function pullCityInfo(){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + locationCurrent + "&APPID=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        temperature = ((response.main.temp)-273.15)*9/5 +32;
        temperature = temperature.toFixed(2);
        humidity = response.main.humidity;
        wind = response.wind.speed;
        jumboPop();
    })
}

//Function Call outs
jumboPop();
sidePop();

$("#sideBar-wrapper").on("click", "button", sideClick);
$("#sidebar").on("click", "button", sideButtonClick);