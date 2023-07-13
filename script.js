const apiKey = "2eb7db4a3d2f69491938906c7a0a558e";

function searchWeather(city) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data, city);
      fetchForecast(data.id);
      addCityToHistory(city);
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function displayCurrentWeather(weatherData, city) {
  const currentWeather = document.getElementById("currentWeather");
  currentWeather.innerHTML = `
    <h2>${city}</h2>
    <p>Date: ${new Date().toLocaleDateString()}</p>
    <p>Temperature: ${temperatureFahrenheit}°F</p>
    <p>Humidity: ${weatherData.main.humidity}%</p>
    <p>Wind Speed: ${weatherData.wind.speed} mph</p>
  `;
}



function fetchForecast(cityId) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=imperial&appid=${apiKey}`;

  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function displayForecast(forecastData) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "";

  for (let i = 0; i < forecastData.list.length; i += 8) {
    const forecast = forecastData.list[i];
    const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();

    const forecastElement = document.createElement("div");
    forecastElement.classList.add("forecast-item");
    forecastElement.innerHTML = `
      <h3>${forecastDate}</h3>
      <img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="Weather Icon">
      <p>Temperature: ${forecast.main.temp}°F</p>
      <p>Humidity: ${forecast.main.humidity}%</p>
      <p>Wind Speed: ${forecast.wind.speed} mph</p>
    `;

    forecastContainer.appendChild(forecastElement);
  }
}

function addCityToHistory(city) {
  const searchHistory = document.getElementById("searchHistory");
  const listItem = document.createElement("li");
  listItem.textContent = city;
  searchHistory.appendChild(listItem);
}


const form = document.getElementById("searchForm");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const cityInput = document.getElementById("cityInput").value;
  searchWeather(cityInput);
});


const searchHistory = document.getElementById("searchHistory");
searchHistory.addEventListener("click", function(event) {
  if (event.target.tagName === "LI") {
    const city = event.target.textContent;
    searchWeather(city);
  }
});
