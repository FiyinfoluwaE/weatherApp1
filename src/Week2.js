function first(event) {
  event.preventDefault();
}
let cel = document.querySelector("#celsius");
cel.addEventListener("click", first);

function second(event) {
  event.preventDefault();
  let fah = document.querySelector("#temperature");
  fah.innerHTML = 27 * 1.8 + 32;
}
let fah = document.querySelector("#fahrenheit");
fah.addEventListener("click", second);

function third(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchInput");
  let city = `${cityInput.value}`;
  let apiKey = `2857bd67083147845b42e714a671529d`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(third1);
}
let formInput = document.querySelector("#searchBar");
formInput.addEventListener("submit", third);

function third1(response) {
  let cityName = `${response.data.name}`;
  let country = `${response.data.sys.country}`;
  let temperature = Math.round(response.data.main.temp);
  let description = `${response.data.weather[0].description}`;
  let windSpeed = `${response.data.wind.speed}`;
  let humidity = `${response.data.main.humidity}`;
  let h1 = document.querySelector("h1");
  let cel = document.querySelector("#temperature");
  let des = document.querySelector("#des");
  let wind = document.querySelector("#wind");
  let humi = document.querySelector("#humi");
  h1.innerHTML = `${cityName}, ${country}`;
  cel.innerHTML = `${temperature}`;
  des.innerHTML = `Description: ${description}`;
  wind.innerHTML = `Windspeed: ${windSpeed}`;
  humi.innerHTML = `Humidity: ${humidity}`;
}

function third3(position) {
  let apiKey = `2857bd67083147845b42e714a671529d`;
  let unit = `metric`;
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(third1);
}
function third2() {
  navigator.geolocation.getCurrentPosition(third3);
}
let currentCityButton = document.querySelector("#currentCity");
currentCityButton.addEventListener("click", third2);

function fourth() {
  let current = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thursday", "Fri", "Sat"];
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
