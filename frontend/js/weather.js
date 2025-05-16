const API_KEY = "17e2be92c9ff9781f76b10f4e4d88128";
const CITY = "Dhaka";

export async function loadWeather() {
  const weatherElement = document.getElementById("weatherInfo");

  if (!weatherElement) return;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
    );

    const data = await res.json();

    if (data.cod === 200) {
      const temp = data.main.temp.toFixed(1);
      const desc = data.weather[0].description;
      const cityName = data.name;

      weatherElement.textContent = `⛅ ${cityName}: ${temp}°C, ${desc}`;
    } else {
      weatherElement.textContent = "Weather data not available.";
    }
  } catch (error) {
    console.error("Weather fetch error: ", error);
    weatherElement.textContent = "Failed to load weather.";
  }
}
