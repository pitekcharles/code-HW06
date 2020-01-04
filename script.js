var temperature = 0;
var date = "todays date";
var locationCurrent = "everywhere";
var humidity = 0;
var wind = 0;
var UV = 0;
var cityAry = ["Denver", "Des Moines", "Moscow"];
var apiKey = "9bd07f7d4ce4fe8a1ea716aadf106115";
var latCurrent = 0;
var lonCurrent = 0;
var temp1 = 0;
var temp2 = 0;
var temp3 = 0;
var temp4 = 0;
var temp5 = 0;
var temp5day = [];
var date5day = [];
var humidity5day = [];


//Function Creation

//Function for when the search is used
function searchEnter() {

}

//Function to populate current data to jumbotron  
function jumboPop() {
    $("#tempCurrent").text("Temperature: " + temperature + " F");
    $("#locationCurrent").text(locationCurrent + " (" + date + ")");
    $("#humidCurrent").text("Humidity: " + humidity + " %");
    $("#windCurrent").text("Wind Speed: " + wind + " MPH");
    $("#UVCurrent").text("UV Index: " + UV);
}

//Function to populate side bar of saved cities
function sidePop() {
    $("#sidebar").empty();
    cityAry.forEach(function (item) {
        var button = $("<button>").attr({ "type": "button", "class": "btn btn-secondary" });
        button.text(item);
        button.attr({ "data-city": item });
        $("#sidebar").append(button);
    })
}

// //Function for when city is entered into the input field
function sideClick(event) {
    event.preventDefault();
    // console.log(this);
    cityAry.push($("#cityInput").val());
    sidePop();
    locationCurrent = $("#cityInput").val();
    pullCityInfo();

}

//Function for when the side buttons are clicked to populate
function sideButtonClick(event) {
    // console.log(this);
    locationCurrent = $(this).attr("data-city");
    // console.log(locationCurrent);
    pullCityInfo();
    // console.log(UV)
    // pullUVInfo();
    // jumboPop();
    // pop5Day();
}

//function to make ajax calls for a city
function pullCityInfo() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + locationCurrent + "&APPID=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        temperature = ((response.main.temp) - 273.15) * 9 / 5 + 32;
        temperature = temperature.toFixed(2);
        humidity = response.main.humidity;
        wind = response.wind.speed;
        latCurrent = response.coord.lat;
        // console.log("lat " + latCurrent);
        lonCurrent = response.coord.lon;
        var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + latCurrent + "&lon=" + lonCurrent;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            UV = response.value;
            date = response.date_iso;
            var split = date.split("T");
            // console.log(split);
            date = split[0];
            // -----------------------------------------------------------------------
            // $("#UVCurrent").text("UV Index: " + UV);
            // $("#tempCurrent").text("Temperature: " + temperature + " F");
            // $("#locationCurrent").text(locationCurrent + "(" + date + ")");
            // $("#humidCurrent").text("Humidity: " + humidity + " %");
            // $("#windCurrent").text("Wind Speed: " + wind + " MPH");
            // -----------------------------------------------------------------------
            jumboPop();
            var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?appid=" + apiKey + "&q=" + locationCurrent;
            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function(response){
                for (var i = 0; i < 5; i++){
                    temp5day[i] =(((response.list[4+(i*8)].main.temp) - 273.15) * 9 / 5 + 32).toFixed(2);
                    var dateTemp = response.list[4+(i*8)].dt_txt;
                    dateTemp = dateTemp.split(" ");
                    date5day[i] = dateTemp[0];
                    humidity5day[i] = response.list[4+(i*8)].main.humidity;
                }
               
                pop5Day();
                console.log("check");
            })
        })
    })

}

// Function populates info for 5 day forcast
function pop5Day () {
    $(".wrapper5day").empty();
    for(var i=0; i < temp5day.length; i++){
        var colWrap = $("<div>").attr({"class": "col-md-2"});
        var card = $("<div>").attr({"class": "card", "style":"width: 18rem;"});
        var cardbody = $("<div>").attr({"class":"card-body"}); 
        var cardtitle = $("<h5>").attr({"class": "card-title"});
        var cardTemp = $("<p>").attr({'class': "card-text"});
        var cardHumidity = $("<p>").attr({'class': "card-text"});
        $(".wrapper5day").append(colWrap);
        cardTemp.text("Temperature: " + temp5day[i] + " F");
        cardHumidity.text("Humidity: " + humidity5day[i] + " %");
        cardtitle.text(date5day[i]);
        colWrap.append(card);
        card.append(cardbody);
        cardbody.append(cardtitle);
        cardbody.append(cardTemp);
        cardbody.append(cardHumidity);
    }
}

sidePop();

$("#sideBar-wrapper").on("click", "button", sideClick);
$("#sidebar").on("click", "button", sideButtonClick);