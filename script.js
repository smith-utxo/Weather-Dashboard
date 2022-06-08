var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var citiesBtnEl = document.querySelector('#city-buttons'); 
var forecastEl = document.querySelector('#forecast');
var todayDateEl = document.querySelector('#today-date');
var todayTempEl = document.querySelector('#today-temp');
var todayHumidityEl = document.querySelector('#today-humidity');
var todayWindEl = document.querySelector('#today-wind');
var todayIconEl = document.querySelector('#today-icon');
var todayUV = document.querySelector('#today-uv');

var dateOneEl = document.querySelector('#date1');
var dateTwoEl = document.querySelector('#date2');
var dateThreeEl = document.querySelector('#date3');
var dateFourEl = document.querySelector('#date4');
var dateFiveEl = document.querySelector('#date5');

var iconOneEl = document.querySelector('#icon1');
var iconTwoEl = document.querySelector('#icon2');
var iconThreeEl = document.querySelector('#icon3');
var iconFourEl = document.querySelector('#icon4');
var iconFiveEl = document.querySelector('#icon5');

var tempOneEl = document.querySelector('#temp1');
var tempTwoEl = document.querySelector('#temp2');
var tempThreeEl = document.querySelector('#temp3');
var tempFourEl = document.querySelector('#temp4');
var tempFiveEl = document.querySelector('#temp5');

var HumidityOneEl = document.querySelector('#humidity1');
var HumidityTwoEl = document.querySelector('#humidity2');
var HumidityThreeEl = document.querySelector('#humidity3');
var HumidityFourEl = document.querySelector('#humidity4');
var HumidityFiveEl = document.querySelector('#humidity5');

var windOneEl = document.querySelector('#wind1');
var windTwoEl = document.querySelector('#wind2');
var windThreeEl = document.querySelector('#wind3');
var windFourEl = document.querySelector('#wind4');
var windFiveEl = document.querySelector('#wind5');

var uvOneEl = document.querySelector('#uv1');
var uvTwoEl = document.querySelector('#uv2');
var uvThreeEl = document.querySelector('#uv3');
var uvFourEl = document.querySelector('#uv4');
var uvFiveEl = document.querySelector('#uv5');

document.getElementById('austin').addEventListener("click", function(){getCityGeo('austin')});
document.getElementById('chicago').addEventListener("click", function(){getCityGeo('chicago')});
document.getElementById('new york').addEventListener("click", function(){getCityGeo('new york')});
document.getElementById('orlando').addEventListener("click", function(){getCityGeo('orlando')});
document.getElementById('san francisco').addEventListener("click", function(){getCityGeo('san francisco')});
document.getElementById('seattle').addEventListener("click", function(){getCityGeo('seattle')});
document.getElementById('denver').addEventListener("click", function(){getCityGeo('denver')});
document.getElementById('atlanta').addEventListener("click", function(){getCityGeo('atlanta')});

var globalDatesArray = []; 
var maxTemp = []; 

var formSubmitHandler = function(event) {
  //prevent page from refreshing 
  event.preventDefault(); 

  //retrieve value from input element
  var cityName = cityInputEl.value.trim().toUpperCase(); 
  
  //pass CityName to GEO function
    getCityGeo(cityName);

      //clear old content if any
      forecastEl.textContent = cityName; 
      cityInputEl.value = ""; 
    
      //Save City to Local Storage 
      localStorage.setItem("city", cityName);
};

var getCityGeo = function (city) {
  forecastEl.textContent = city.toUpperCase(); 
   //format openweather api url 
  var apiOpenWeather = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=60f14806b4f9f5c6687cb7f52fc240ef';
   
    fetch(apiOpenWeather)
    .then(function(response) {
      if (response.ok) { console.log(response);
        response.json().then(function(data){
        console.log(data);
        var cityLat = data[0].lat;
        var cityLon = data[0].lon;
          getCityWeather(cityLat, cityLon);

      })
      } else {
        alert('Error: City Not Found');
      }
    })
    .catch(function(error) {
      alert('Unable to connect to OpenWeather');
    });
};

userFormEl.addEventListener('submit', formSubmitHandler); 

var getCityWeather = function(lat, lon){
  
 var apiWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=60f14806b4f9f5c6687cb7f52fc240ef";
 fetch(apiWeather)
 .then(function(response) {
  if (response.ok) {console.log(response);
    response.json().then(function(data){
      convertDate(data);
      convertTemp(data);
      getWeatherDetails(data);
      //console.log(data.daily[0].dt);
    })

  }

 })
}

  var convertDate = function (data) {
    var daily = data.daily; 
    var datesArray = []; 
    console.log(daily);
    for (var i = 0; i <= 5; i++){
      var milliseconds = daily[i].dt * 1000; 
      var dateObject = new Date(milliseconds);
      var humanDateFormat = dateObject.toLocaleDateString(); 
      datesArray.push(humanDateFormat); 

    }

    globalDatesArray =  datesArray;
    todayDateEl.textContent = '(' + globalDatesArray[0] + ')'; 
    dateOneEl.textContent = globalDatesArray[1];
    dateTwoEl.textContent = globalDatesArray[2];
    dateThreeEl.textContent = globalDatesArray[3];
    dateFourEl.textContent = globalDatesArray[4];
    dateFiveEl.textContent = globalDatesArray[5]; 
    console.log(globalDatesArray);
}

  var convertTemp = function (data){
    console.log(data.daily[0].temp.max);
    var maximumTemp = []; 
    for (var i = 0; i <= 5; i++){
      maximumTemp.push((((data.daily[i].temp.max - 273.15) *1.8) + 32).toFixed(1));
    }
    maxTemp = maximumTemp;
    todayTempEl.textContent = "Temp: " + maxTemp[0] + " °F";
    tempOneEl.textContent = "Temp: " + maxTemp[1] + " °F";
    tempTwoEl.textContent = "Temp: " + maxTemp[2] + " °F";
    tempThreeEl.textContent = "Temp: " + maxTemp[3] + " °F";
    tempFourEl.textContent = "Temp: " + maxTemp[4] + " °F";
    tempFiveEl.textContent = "Temp: " + maxTemp[5] + " °F";
}

var getWeatherDetails = function(data) {
  var humidity = []; 
  var wind = []; 
  var icon = []; 
  var uvi = []; 
  for (var i = 0; i <= 5; i++){
    humidity.push(data.daily[i].humidity);
    wind.push(data.daily[i].wind_speed);
    icon.push(data.daily[i].weather[0].icon);
    uvi.push(data.daily[i].uvi);

  }
  todayHumidityEl.textContent = "Humidity: " + humidity[0] + " %";
  HumidityOneEl.textContent = "Humidity: " + humidity[1] + " %";
  HumidityTwoEl.textContent = "Humidity: " + humidity[2] + " %"; 
  HumidityThreeEl.textContent = "Humidity: " + humidity[3] + " %";
  HumidityFourEl.textContent = "Humidity: " + humidity[4] + " %";
  HumidityFiveEl.textContent = "Humidity: " + humidity[5] + " %";

  todayWindEl.textContent = "Wind: " + wind[0] + " MPH";
  windOneEl.textContent = "Wind: " + wind[1] + " MPH";
  windTwoEl.textContent = "Wind: " + wind[2] + " MPH";
  windThreeEl.textContent = "Wind: " + wind[3] + " MPH";
  windFourEl.textContent = "Wind: " + wind[4] + " MPH";
  windFiveEl.textContent = "Wind: " + wind[5] + " MPH";
  
  
  todayIconEl.setAttribute('src','http://openweathermap.org/img/wn/' + icon[0] + ".png");
  iconOneEl.setAttribute('src','http://openweathermap.org/img/wn/' + icon[1] + ".png");
  iconTwoEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon[2] + ".png");
  iconThreeEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon[3] + ".png"); 
  iconFourEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon[4] + ".png"); 
  iconFiveEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon[5] + ".png"); 

  todayUV.textContent = "UV Index: " + uvi[0];
  uvOneEl.textContent = "UV Index: " + uvi[1];
  uvTwoEl.textContent = "UV Index: " + uvi[2]; 
  uvThreeEl.textContent = "UV Index: " + uvi[3]; 
  uvFourEl.textContent = "UV Index: " + uvi[4]; 
  uvFiveEl.textContent = "UV Index: " + uvi[5]; 

  uvIndexColor(data.daily[0].uvi);
  
}
 
//UV Index; 1-2 Green; 3-5 Yellow; 6-7 Orange; 8-10 Red; 11+ Purple; 
var uvIndexColor = function(uvi) {
    if (uvi < 3){
    todayUV.className = 'green';
    }
      else if (uvi < 6){
       todayUV.className = 'yellow';
      }
      else if (uvi < 8){
        todayUV.className = 'orange';
      }
      else if (uvi < 11){
        todayUV.className = 'red'
      }
      else {
        todayUV.className = 'purple';
      }
}

//Check localStorage for City and pass to function if present
var citySaved = localStorage.getItem('city');
getCityGeo(citySaved);
