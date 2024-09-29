function refreshWeather(response) {
  let weatherTemperature = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  let weatherCity = document.querySelector("#city");
  let weatherDescription = document.querySelector("#description");
  let weatherHumidity = document.querySelector("#humidity");
  let weatherWind = document.querySelector("#wind-speed");
  let wind = Math.round(response.data.wind.speed);
  let weatherTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let weatherIcon = document.querySelector("#icon");

  weatherTemperature.innerHTML = `${temperature}`;
  weatherCity.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  weatherHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  weatherWind.innerHTML = `${wind}km/h`;
  weatherTime.innerHTML = formatDate(date);
  weatherIcon.innerHTML = `<img
              src="${response.data.condition.icon_url}" class="weather-icon" />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes},`;
}

function searchCity(city) {
  let apiKey = "cf31b3ef6b626986604ad601d3at6doe";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Johannesburg");
