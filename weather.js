const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");

searchBtn.addEventListener("click", getWeather);

async function  getWeather() {
    const city = cityInput.value.trim();
    if(!city){
        result.textContent = "Please enter a city name!!";
        return;
    }
    result.textContent = "Loading...";

    try{
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
        const geoData = await geoRes.json();
        if(!geoData.results || geoData.results.length === 0){
            result.textContent = "city not found.";
        }
        const {latitude, longitude, name, country} = geoData.results[0];

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherRes.json();
        const weather = weatherData.current_weather;

        result.textContent = `weather in ${name}, ${country}: ${weather.temperature}°C,
        wind: ${weather.windspeed} km/h`;
    }
    catch(err){
        result.textContent = "Error fetching weather data.";
        console.error(err);
    }
    
}