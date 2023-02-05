const key = "0a4b5f5b92215551fbb579c3047f38a8";
function initPage() {
    var inputEl = document.getElementById("cityInput");
    var searchBtn = document.getElementById("searchBtn");
    var clearEl = document.getElementById("clearHistory");
    var nameEl = document.getElementById("city-name");
    var currentIconEl = document.getElementById("currentPic");
    var currentTemp = document.getElementById("Temperature");
    var currentWind = document.getElementById("windSpeed");
    var currentHumi = document.getElementById("humidity");
    var history = document.getElementById("history");
    }

    function getWeather(cityName){
        fetch("https://api.openweathermap.org/data/2.5/forecast?lat=47.608013&lon=-122.335167&appid="+ key)
        .then(function(response){
            return response.json();
            console.log(response);
        })
        .then(function(data){
            console.log(data);
        })
    }

    getWeather();