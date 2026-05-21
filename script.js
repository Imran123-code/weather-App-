const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

// Fetch weather by city
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
}

// Fetch weather by user location
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
      },
      (error) => {
        alert("Unable to retrieve location.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Fetch weather and display
async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      document.getElementById("weatherInfo").innerHTML = "❌ City not found!";
      return;
    }

    document.getElementById("weatherInfo").innerHTML = `
          <h3>${data.name}, ${data.sys.country}</h3>
          <p>🌡️ Temp: ${data.main.temp} °C</p>
          <p>☁️ Condition: ${data.weather[0].description}</p>
          <p>💨 Wind: ${data.wind.speed} m/s</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
        `;
  } catch (error) {
    document.getElementById("weatherInfo").innerHTML =
      "⚠️ Error fetching data.";
  }
}
