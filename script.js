var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var citiesBtnEl = document.querySelector('#city-buttons'); 
var forecastEl = document.querySelector('#forecast');




var formSubmitHandler = function(event) {
  //prevent page from refreshing 
  event.preventDefault(); 

  //retrieve value from input element
  var cityName = cityInputEl.value.trim(); 
  console.log(cityName);

  if (cityName) {
    getCityGeo(cityName);

      //clear old content if any
      forecastEl.textContent = ""; 
      cityInputEl.value = ""; 
  } else {
     alert("Please enter a city");
  }
};

var getCityGeo = function (city) {
   //format openweather api url 
  var apiOpenWeather = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=24d67e043683f1a926063c455aa07dc3';
    // my api key: 24d67e043683f1a926063c455aa07dc3 
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
  // my api key: 7854b2b95dde963504e5ec0faeb5cf6f
 var apiWeather = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=24d67e043683f1a926063c455aa07dc3 ";
 fetch(apiWeather)
 .then(function(response) {
  if (response.ok) {console.log(response);

  }

 })
}