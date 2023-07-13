
const apiKey = "YOUR_API_KEY";

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