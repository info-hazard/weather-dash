// Assigning IDs to variables 
var searchBtn = document.querySelector('#searchBtn');
var locationInput = document.querySelector('#location');
var tempEl = document.querySelector('#main-city-temp');
var humidityEl = document.querySelector('#main-city-humid');
var windEl = document.querySelector('#main-city-wind');
var locationName = document.querySelector('#main-city-name');
var forecastCardEl = document.querySelector('#five-day');
var historyEl = document.querySelector('#search-history');
var counter = 1
// A variable with an empty array to store past searches in local storage
var searchList = []

//function to fetch forecast data based on user input
function callForecast(search) {
    var key = '5e6f355bc87b7f368b38aecdf2f70995';
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + 'Chicago' + "&appid=" + key;
      fetch(queryURL)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    console.log(data.city.name);
                    console.log(data.list[0].main.temp)
                });
            } else {
                alert('Invalid Input');
            }
        })
  };

callForecast()