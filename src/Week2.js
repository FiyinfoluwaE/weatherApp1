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
  let first = document.querySelector("#first");
  first.innerHTML = `${day} ${date}`;
  let second = document.querySelector("#second");
  second.innerHTML = `${day} ${date}`;
  let third = document.querySelector("#third");
  third.innerHTML = `${day} ${date}`;
  let fourth = document.querySelector("#fourth");
  fourth.innerHTML = `${day} ${date}`;
  let fifth = document.querySelector("#fifth");
  fifth.innerHTML = `${day} ${date}`;
}
fourth();

let celsiusTemperature = null;

let formInput = document.querySelector("#searchBar");
formInput.addEventListener("submit", citySearch2);

let cel = document.querySelector("#celsius");
cel.addEventListener("click", second);

let fah = document.querySelector("#fahrenheit");
fah.addEventListener("click", first);
citySearch("Ikorodu");
