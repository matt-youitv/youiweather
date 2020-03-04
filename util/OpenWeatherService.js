import * as AppConstants from "util/Constants";

const fetchWeatherData = (type, city) => {
  const locationQuery = city.name
    ? `q=${city.name}`
    : `lat=${city.lat}&lon=${city.lon}`;
  const url = `${AppConstants.OPEN_WEATHER_BASE_URL}${type}?${locationQuery}&APPID=${AppConstants.OPEN_WEATHER_API_KEY}&units=${AppConstants.DEFAULT_UNITS}`;
  //const url = 'https://api.openweathermap.org/data/2.5/weather?lat=37.785834&lon=-122.406417&APPID=1e08a24aa7b0bcf8d0fdcc706bb75531&units=metric';
  console.log(`fetching -> ${url}`);
  return fetch(url).then(response => {
    if (!response.ok) {
      if (response.status == 404) {
        throw new Error(`No weather data found for ${city.name}`);
      } else {
        throw new Error(`Request failed [${response.status}]`);
      }
    }
    return response.json();
  });
};

export const fetchCurrentWeather = city => {
  return fetchWeatherData(
    AppConstants.OPEN_WEATHER_CURRENT_CONDITIONS_ENDPOINT,
    city
  );
};

export const fetchWeatherForecast = city => {
  return fetchWeatherData(
    AppConstants.OPEN_WEATHER_5DAY_FORECAST_ENDPOINT,
    city
  );
};
