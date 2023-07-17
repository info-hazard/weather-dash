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

// Setting time and date function 
function timeDate(date){
    var date = new Date();
    console.log(date);
    var month = date.getMonth()+1;
    var day = date.getDate();
    var year = date.getFullYear()
    
    var dayOutput =
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day + '/' + 
        year;
    return dayOutput;
}

// Function to fetch forecast data based on user input
function callForecast(search) {
    var key = '5e6f355bc87b7f368b38aecdf2f70995';
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + search + "&appid=" + key;
      fetch(queryURL)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    console.log(data.city.name);
                    console.log(data.list[0].main.temp)
                    displayForecast(data)
                });
            } else {
                alert('Invalid Input');
            }
        })
  };

// Function to fetch weather data based on user input
function callWeather(search) {
    var key = 'd49b1f6a58f01678d1f0b70e468590c6';
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + search + "&appid=" + key;
    fetch(weatherURL)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
                displayWeather(data)
            })
        }
    })
};




