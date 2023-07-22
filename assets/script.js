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

init()

function init() {
    var storedSearch = JSON.parse(localStorage.getItem('searchList'));
    if (storedSearch !== null) {
        searchList = storedSearch;
    }
    renderHistory()
}
function storeHistory() {
    localStorage.setItem('searchList',JSON.stringify(searchList))
}

function renderHistory() {
    historyEl.innerHTML = ''
    for (var i = 0; i < searchList.length; i++) {
        var search = searchList[i];
        var listHistory = document.createElement('li');
        listHistory.classList = 'list-group-item';
        listHistory.setAttribute('id', `list${counter}`);
        listHistory.setAttribute('data-search', search)
        listHistory.textContent = search
        historyEl.appendChild(listHistory);
        counter++
    }
    if (!search) {
        return;
    } else {
        callWeather(search)
        callForecast(search)
    };
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
    var key = '5e6f355bc87b7f368b38aecdf2f70995';
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

// actuating displayWeather function to render elements and display icons and weather data
var displayWeather = function (data) {
    locationName.innerHTML = ''
    tempEl.innerHTML = ''
    humidityEl.innerHTML = ''
    windEl.innerHTML = ''

    var weatherType = data.weather[0].main
    var img = ''
    if (weatherType === "Clouds"){
        img = '☁️'
    } else if (weatherType === "Clear") {
        img ='☀️'
    } else if (weatherType === "Rain") {
        img ='🌧️'
    }

    locationName.textContent = data.name + ' ' + timeDate() + ' ' + img
    tempEl.textContent = 'Temperature: ' + data.main.temp + ' °F'
    humidityEl.textContent = 'Humidity: ' + data.main.humidity + '%'
    windEl.textContent = 'Wind Speed: ' + data.wind.speed + ' mph'
}

// Actuating displayForecast function to render elements and display cards
var displayForecast = function (data) {
    forecastCardEl.innerHTML = ''
    for(var i=0, j=0; j<=6; i=i+6){
        var getDate = data.list[i].dt;
        if(data.list[i].dt != data.list[i+1].dt) {
            var d = new Date(0);
            d.setUTCSeconds(getDate)
            var date = d
            console.log(date)
            var month = date.getMonth()+1;
            var day = date.getDate();
            var year = date.getFullYear();
            var cardDate = month + '/' + day + '/' + year;
            var weatherType = data.list[i].weather[0].main;
            var image = ''
            if (weatherType === "Clouds"){
                image = '☁️'
            } else if (weatherType === "Clear") {
                image ='☀️'
            } else if (weatherType === "Rain") {
                image ='🌧️'
            }

            var temperature = data.list[i].main.temp
            var humidity = data.list[i].main.humidity
            var windSpeed = data.list[i].wind.speed
            
            var weatherCard = 
    `<div class="card m-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${cardDate}</h5>
            <p>${image}</p>
            <p class="card-text">Temperature: ${temperature} °F</p>
            <p class="card-text">Humidity: ${humidity}%</p>
            <p class="card-text">Wind Speed: ${windSpeed} Mph</p>
        </div>
    </div>`
    forecastCardEl.innerHTML += weatherCard
    j++
        }
    }
}




