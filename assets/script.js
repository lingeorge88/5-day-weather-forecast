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
    var lat;
    var lon;
    function getWeather(cityName){
        fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName +"&limit=1&appid=" +key)
        .then(function(response){
            return response.json();
            console.log(response);
            
        })
        .then(function(data){
            console.log(data);
            var lat = data[0].lat;
            var lon = data[0].lon;
        })
        return lat;
        return lon;
        let foreCastURL="https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=" + key;
        fetch(foreCastURL)
        .then(function(response){
            return response.json();
            console.log(response);
        })
        .then(function(data){
            console.log(data);
        })
    }

  
    
   getWeather("Kirkland");