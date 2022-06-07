var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var citiesBtnEl = document.querySelector('#city-buttons'); 
var forecastEl = document.querySelector('#forecast');
var todayDateEl = document.querySelector('#today-date');

var dateOneEl = document.querySelector('#date1');
var dateTwoEl = document.querySelector('#date2');
var dateThreeEl = document.querySelector('#date3');
var dateFourEl = document.querySelector('#date4');

var globalDatesArray = []; 
var maxTemp = []; 

var formSubmitHandler = function(event) {
  //prevent page from refreshing 
  event.preventDefault(); 

  //retrieve value from input element
  var cityName = cityInputEl.value.trim(); 
  console.log(cityName);

  if (cityName) {
    getCityGeo(cityName);

      //clear old content if any
      forecastEl.textContent = cityName; 
      cityInputEl.value = ""; 
  } else {
     alert("Please enter a city");
  }
};

var getCityGeo = function (city) {
  
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
        alert('Error: GitHub User Not Found');
      }
    })
    .catch(function(error) {
      alert('Unable to connect to GitHub');
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
      //console.log(data.daily[0].dt);
    })

  }

 })
}

  var convertDate = function (data) {
    var daily = data.daily; 
    var datesArray = []; 
    console.log(daily);
    for (var i = 0; i < 5; i++){
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
    console.log(globalDatesArray);
  }

  var convertTemp = function (data){
    console.log(data.daily[0].temp.max);
    var maximumTemp = []; 
    for (var i = 0; i < 5; i++){
      maximumTemp.push((((data.daily[i].temp.max - 273.15) *1.8) + 32).toFixed(1));
    }
    maxTemp = maximumTemp;
    console.log(maxTemp);
  }
 