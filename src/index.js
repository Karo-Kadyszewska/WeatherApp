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
  console.log(cityName);
  console.log(temperature);
  mainDescription.innerHTML = description;
  cityHeader.innerHTML = cityName;
  tempCelcBig.innerHTML = temperature;
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
function displayForecast() {
  let forecastDays = ["Day1", "Day2", "Day3", "Day4", "Day5"];
  let forecastHtml = "";

  forecastDays.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="forecastNextDays">
      <div id="forecastDay">Fri</div>
      <div class="forecastIcon">
        <i class="fa-solid fa-cloud-sun"></i>
      </div>
      <div class= "forecastTemperatures"> 
        <div class="forecastTempDay forecastTemperature">19°</div>
        <div class="forecastTempNight forecastTemperature">7°</div>
      </div>
    </div>
      `;
  });
  let forecastNextDays = document.querySelector("#forecastNextDays");
  forecastNextDays.innerHTML = forecastHtml;
}

locationSearch.addEventListener("click", getGeolocation);
citySearch.addEventListener("submit", cityFormInput);
changeTempFormatButton.addEventListener("click", convertBigTemp);

getAxiosForCitySearch();
displayForecast();

//Math.round((temperature * 9) /5 +32) - celcius to fahrenheir
// temp-big
