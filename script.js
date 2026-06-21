const apiKey = "70ff90c7c40d7c1e8a58c37e2db29466"; 


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
