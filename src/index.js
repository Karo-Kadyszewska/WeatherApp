/*let weather = {
    paris: {
    name: "Paris",
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    name: "Tokyo",
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    name: "Lisbon",
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    name: "San Francisco",
    temp: 20.9,
    humidity: 100
  },
  warsaw: {
    name: "Warsaw",
    temp: -5,
    humidity: 20
  }
};*/

let monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let weekdayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let smallDate = document.querySelector(".weekday-date-small");
smallDate.innerHTML = mainDateChange();

let apiKey = "2f7ab5b8663340e58b40b89e735a06d7";
let city = "Barcelona";

let changeTempFormatButton = document.querySelector(".buttonF");
let locationSearch = document.querySelector("#buttonCheckCurrentLocation");
let citySearch = document.querySelector("#citySearchForm");
let clickCount = 0;

function mainDateChange(todayDate) {
  let now = new Date();
  let day = weekdayName[now.getDay()];
  let dayNr = now.getDate();
  let month = monthName[now.getMonth()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${dayNr} ${month} </br>${hours}:${minutes}`;
}

function getTempAndCity(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let description = `${response.data.weather[0].main} - ${response.data.weather[0].description}   `;
  console.log(description);
  let tempCelcBig = document.querySelector(".temp-big");
  let cityHeader = document.querySelector("#cityHeader");
  let mainDescription = document.querySelector(".weather-description");
  console.log(cityName);
  console.log(temperature);
  mainDescription.innerHTML = description;
  cityHeader.innerHTML = cityName;
  tempCelcBig.innerHTML = temperature;
}

function getAxiosForCitySearch() {
  let cityInput = city;
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}
  &units=metric`;
  axios.get(`${weatherApiUrl}&appid=${apiKey}`).then(getTempAndCity);
}

function cityFormInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  if (cityInput) {
    city = `${cityInput.value}`;
    getAxiosForCitySearch();
  }
}

function getAxiosForPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2f7ab5b8663340e58b40b89e735a06d7";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  console.log(latitude, longitude);
  axios.get(`${weatherApiUrl}&appid=${apiKey}`).then(getTempAndCity);
}

function getGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getAxiosForPosition);
}

function convertBigTemp(event) {
  event.preventDefault();
  let changeTempFormatButton = document.querySelector(".buttonF-text");
  let tempCelcBig = document.querySelector(".temp-big");
  if (clickCount === 0) {
    changeTempFormatButton.innerHTML = `F°`;
    tempCelcBig.innerHTML = 222;
    clickCount = 1;
  } else if (clickCount === 1) {
    changeTempFormatButton.innerHTML = `C°`;
    tempCelcBig.innerHTML = 19;
    clickCount = 0;
  }
}
locationSearch.addEventListener("click", getGeolocation);
citySearch.addEventListener("submit", cityFormInput);
changeTempFormatButton.addEventListener("click", convertBigTemp);

getAxiosForCitySearch();

//Math.round((temperature * 9) /5 +32) - celcius to fahrenheir
// temp-big
