function refreshWeather(response) {
  let weatherTemperature = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  let weatherCity = document.querySelector("#city");

  weatherCity.innerHTML = response.data.city;
  weatherTemperature.innerHTML = `${temperature}`;
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
