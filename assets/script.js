const key = "0a4b5f5b92215551fbb579c3047f38a8";
    var inputEl = document.getElementById("cityInput");
    var searchBtn = document.getElementById("searchBtn");
    var clearEl = document.getElementById("clearHistory");
    var nameEl = document.getElementById("city-name");
    var currentIconEl = document.getElementById("currentPic");
    var currentTemp = document.getElementById("Temperature");
    var currentWind = document.getElementById("windSpeed");
    var currentHumi = document.getElementById("humidity");
    var history = document.getElementById("history");
    var currentWeather = document.getElementById("weatherCond");

var lat;
var lon;
    function getCoord(cityName){
        fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName +"&limit=1&appid=" +key)
        .then(function(response){
            return response.json();
            console.log(response);
            
        })
        .then(function(data){
            console.log(data);
            lat = data[0].lat;
            lon = data[0].lon;
            console.log(lat);
            console.log(lon);
            fetchForecast();
            fetch5day();
        })
    }
    function fetchForecast(){
        fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+key)
        .then(function(response){
            return response.json();
            console.log(response);
            
        })
        .then(function(data){
            console.log(data);
        const currentDate = new Date(data.list[0].dt*1000);
        console.log(currentDate);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        nameEl.innerHTML= data.city.name + ", " + month + "/" + day + "/" + year;
        console.log(month);
            var weatherIcon = data.list[0].weather[0].icon;
        // console.log(weatherIcon);
        currentIconEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
        currentWeather.innerHTML = data.list[0].weather[0].description;
        currentTemp.innerHTML="Temperature: " + k2C(data.list[0].main.temp) + "°C";
        currentHumi.innerHTML="Humidity: " + data.list[0].main.humidity + " %";
        currentWind.innerHTML="Wind speed: " + data.list[0].wind.speed + " mph";
    })
}
function fetch5day(){
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+key)
        .then(function(response){
            return response.json();
            console.log(response);
            
        })
        .then(function(data){
            console.log(data);
        const forecastEls = document.querySelectorAll(".forecast");
        for(var i = 0; i<forecastEls.length; i++){
            forecastEls[i].innerHTML="";
            const forecastIndex = i*8 +4;
            var forecastDate = new Date(data.list[forecastIndex].dt*1000);
            var forecastDay = forecastDate.getDate();
            var forecastMonth = forecastDate.getMonth() + 1;
            var forecastYear = forecastDate.getFullYear();
            var forecastDateEl = document.createElement("p");
            forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
            forecastEls[i].append(forecastDateEl);
            const forecastWeatherIcons = document.createElement("img");
            forecastWeatherIcons.setAttribute("src","https://openweathermap.org/img/wn/" + data.list[forecastIndex].weather[0].icon + "@2x.png");
            forecastEls[i].append(forecastWeatherIcons);
            const forecastTemp = document.createElement("p");
            forecastTemp.innerHTML="Temperature: " + k2C(data.list[forecastIndex].main.temp) + "°C";
            forecastEls[i].append(forecastTemp);
            const forecastHumi = document.createElement("p");
            forecastHumi.innerHTML="Humidity: " + data.list[forecastIndex].main.humidity + "%";
            forecastEls[i].append(forecastHumi);
            const forecastWindSp = document.createElement("p");
            forecastWindSp.innerHTML ="Wind speed: " + data.list[forecastIndex].wind.speed +" mph";
            forecastEls[i].append(forecastWindSp);
        }
})
}

searchBtn.addEventListener("click",function(){
    var searchName = inputEl.value;
    getCoord(searchName);
})
function k2C(K){
    return Math.floor((K - 273.15));
}
