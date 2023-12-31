function fourth() {
  let current = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[current.getDay()];
  let date = current.getDate();
  let time = current.toLocaleString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let currentTime = document.querySelector("#currentTime");
  currentTime.innerHTML = `${day},${date} ${time}`;
}

function formatForecast(timestamp) {
  let time = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[time.getDay()];
  return day;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row Sunny">`;
  forecast.forEach(function (forecasting, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
      <div id="first">${formatForecast(forecasting.time)}</div>
        <img src="${forecasting.condition.icon_url}" alt="" width="50px">
      <div class="weatherForecastTemps">
       <span id="maxForecastTemp">${Math.round(
         forecasting.temperature.maximum
       )}℃</span>
       <span id="minForecastTemp">${Math.round(
         forecasting.temperature.minimum
       )}℃</span>
      </div>
    </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function citySearch(city) {
  let apiKey = `2857bd67083147845b42e714a671529d`;
  let apiKey1 = `5b45b512306f330fb43aob2122bt1dc0`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  let apiUrl1 = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey1}&units=${unit}`;
  axios.get(apiUrl).then(weatherInfo);
  axios.get(apiUrl1).then(weatherIcon);
}

function citySearch2(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchInput");
  let city = `${cityInput.value}`;
  citySearch(city);
}

function getForecast(cityName) {
  let apiKey = `5b45b512306f330fb43aob2122bt1dc0`;
  let unit = `metric`;
  forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=${unit}`;
  axios.get(forecastUrl).then(displayForecast);
}

function weatherInfo(response) {
  let cityName = `${response.data.name}`;
  let country = `${response.data.sys.country}`;

  let celsiusTemperature = response.data.main.temp;

  let description = `${response.data.weather[0].description}`;
  let windSpeed = `${response.data.wind.speed}`;
  let humidity = `${response.data.main.humidity}`;
  let h1 = document.querySelector("h1");
  let cel = document.querySelector("#temperature");
  let des = document.querySelector("#des");
  let wind = document.querySelector("#wind");
  let humi = document.querySelector("#humi");
  h1.innerHTML = `${cityName}, ${country}`;
  cel.innerHTML = `${Math.round(celsiusTemperature)}`;
  des.innerHTML = `Description: ${description}`;
  wind.innerHTML = `Windspeed: ${windSpeed}`;
  humi.innerHTML = `Humidity: ${humidity}`;
  getForecast(response.data.name);
}

function currentCoordinate(position) {
  let apiKey = `2857bd67083147845b42e714a671529d`;
  let apiKey1 = `5b45b512306f330fb43aob2122bt1dc0`;
  let unit = `metric`;
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  let apiUrl1 = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey1}&units=${unit}`;
  axios.get(apiUrl).then(weatherInfo);
  axios.get(apiUrl1).then(weatherIcon);
}
function coordinate() {
  navigator.geolocation.getCurrentPosition(currentCoordinate);
}
let currentCityButton = document.querySelector("#currentCity");
currentCityButton.addEventListener("click", coordinate);

function weatherIcon(response) {
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `${response.data.condition.icon_url}`);
  let description = document.querySelector("#weatherDescription");
  description.innerHTML = `${response.data.condition.description}`;
}

function first(event) {
  event.preventDefault();
  cel.classList.remove("active");
  fah.classList.add("active");
  let fahTemp = document.querySelector("#temperature");
  fahrenheitTemp = celsiusTemperature * 1.8 + 32;
  fahTemp.innerHTML = Math.round(fahrenheitTemp);
}

function second(event) {
  event.preventDefault();
  fah.classList.remove("active");
  cel.classList.add("active");
  let celTemp = document.querySelector("#temperature");
  celTemp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let formInput = document.querySelector("#searchBar");
formInput.addEventListener("submit", citySearch2);

let cel = document.querySelector("#celsius");
cel.addEventListener("click", second);

let fah = document.querySelector("#fahrenheit");
fourth();
fah.addEventListener("click", first);
citySearch("Ikorodu");
