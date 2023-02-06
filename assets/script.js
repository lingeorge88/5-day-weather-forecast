const key = "0a4b5f5b92215551fbb579c3047f38a8";
    // selecting all DOM elements for manipulation later
var inputEl = document.getElementById("cityInput");
    var searchBtn = document.getElementById("searchBtn");
    var clearEl = document.getElementById("clearHistory");
    var nameEl = document.getElementById("city-name");
    var currentIconEl = document.getElementById("currentPic");
    var currentTemp = document.getElementById("Temperature");
    var currentWind = document.getElementById("windSpeed");
    var currentHumi = document.getElementById("humidity");
    var history1 = document.getElementById("history");
    var currentWeather = document.getElementById("weatherCond");
    var searchHistory = JSON.parse(localStorage.getItem("search"))|| [];
    console.log(searchHistory)

var lat;
var lon;
// using OpenWeatherMap Geomapping API to return the lat and lon values for a given city
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
    // fetches current Weather conditions from the API using lat and lon values obtained from geomapping api
    function fetchForecast(){
        fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+key)
        .then(function(response){
            return response.json();
            console.log(response);
            
        })
        .then(function(data){
            console.log(data);
            // converting Unix time stamp into standard format
        const currentDate = new Date(data.list[0].dt*1000);
        console.log(currentDate);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        nameEl.innerHTML= data.city.name + ", " + month + "/" + day + "/" + year;
        // filling out containers with information from the API
        var weatherIcon = data.list[0].weather[0].icon;
        currentIconEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
        currentWeather.innerHTML = data.list[0].weather[0].description;
        currentTemp.innerHTML="Temperature: " + k2C(data.list[0].main.temp) + "°C";
        currentHumi.innerHTML="Humidity: " + data.list[0].main.humidity + " %";
        currentWind.innerHTML="Wind speed: " + data.list[0].wind.speed + " mph";
    })
}
// fetches 5 day forecast with lon and lat values obtained from geomapping api
function fetch5day(){
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+key)
        .then(function(response){
            return response.json();
            console.log(response);
            
        })
        .then(function(data){
            console.log(data);
        const forecastEls = document.querySelectorAll(".forecast");
        // creating and appending elements from the api and filling out the 5 day forecast container
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
// When the user clicks the search button, we are saving the input to local storage unless it already exists, and passing the input through the getCoord function which will help us get the forecast
searchBtn.addEventListener("click",function(){
    var searchName = inputEl.value;
    getCoord(searchName);
    if(!searchHistory.includes(searchName)){
        searchHistory.push(searchName);
        localStorage.setItem("search", JSON.stringify(searchHistory));
    }
    displaySearchHistory();
})
// clears the local storage and previous search results when clear history is clicked
clearEl.addEventListener("click", function(){
    searchHistory=[];
    localStorage.clear();
    displaySearchHistory();
})
// converts default temperature in Kelvin to celsius
function k2C(K){
    return Math.floor((K - 273.15));
}
// adding a input element for each previous search result to our container from the searchHistory array which comes from local storage
function displaySearchHistory(){
    history1.innerHTML="";
    searchHistory.forEach(function(currentValue, index){
        var prevSearch = document.createElement("input");
        // <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
        prevSearch.setAttribute("type","text");
        prevSearch.setAttribute("readonly",true);
        prevSearch.setAttribute("class", "form-control d-block bg-black text-warning");
        prevSearch.setAttribute("id", "pointer");
        prevSearch.setAttribute("value", currentValue);
       
        prevSearch.addEventListener("click", function() {
            console.log(index);
            console.log(currentValue);
            getCoord(currentValue);
        })
        history1.append(prevSearch);
    })
}
// displays users' last search result upon loading the page, if no previous searches exist then the page will be empty.
function displayLastsearch(){
    if(searchHistory.length >  0){
        getCoord(searchHistory[searchHistory.length - 1]);
    }
}
displaySearchHistory();
displayLastsearch();