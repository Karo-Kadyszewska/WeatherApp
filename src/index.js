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
  "December",
];
let weekdayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let smallDate = document.querySelector(".weekday-date-small");
smallDate.innerHTML = mainDateChange();

let apiKey = "841bfa4334tb6efa8e035d83eco4e42d";
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
  let temperature = Math.round(response.data.temperature.current);
  let cityName = response.data.city;
  let description = `${response.data.condition.description}`;
  console.log(description);
  let tempCelcBig = document.querySelector(".temp-big");
  let cityHeader = document.querySelector("#cityHeader");
  let mainDescription = document.querySelector(".weather-description");
  let weatherIcon = document.querySelector(".emoji-big");
  let windValue = document.querySelector(".windspeedValue");
  console.log(cityName);
  console.log(temperature);
  mainDescription.innerHTML = description;
  cityHeader.innerHTML = cityName;
  tempCelcBig.innerHTML = temperature;
  weatherIcon.innerHTML = `
    <img
      src="${response.data.condition.icon_url}"
      class="emoji-big"
    ></img>
  `;
  windValue.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.city);
}

function getAxiosForCitySearch() {
  let cityInput = city;
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}`;
  axios.get(`${weatherApiUrl}&key=${apiKey}&units=metric`).then(getTempAndCity);
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
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}`;
  console.log(latitude, longitude);
  axios.get(`${weatherApiUrl}&key=${apiKey}&units=metric`).then(getTempAndCity);
}

function getGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getAxiosForPosition);
}
//
function convertUnit(event) {
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
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(cityInput) {
  let apiKey = "841bfa4334tb6efa8e035d83eco4e42d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityInput}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
    <div class="forecastNextDays">
      <div id="forecastDay">${formatForecastDay(day.time)}</div>
      <div class="forecastIcon">
    <img
      src="${day.condition.icon_url}"
      class="smallWeatherIcon"
    ></img>
      </div>
      <div class= "forecastTemperatures"> 
        <div class="forecastTempDay forecastTemperature">${Math.round(
          day.temperature.day
        )}°</div>
        <div class="forecastTempNight forecastTemperature">${Math.round(
          day.temperature.minimum
        )}°</div>
      </div>
    </div>
      `;
    }
  });
  let forecastNextDays = document.querySelector("#forecastNextDays");
  forecastNextDays.innerHTML = forecastHtml;
}

locationSearch.addEventListener("click", getGeolocation);
citySearch.addEventListener("submit", cityFormInput);
changeTempFormatButton.addEventListener("click", convertUnit);

getAxiosForCitySearch();

//Math.round((temperature * 9) /5 +32) - celcius to fahrenheir
// temp-big
