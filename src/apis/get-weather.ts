import axios from "axios";

const OPEN_WEATHER_MAP_API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
const MILLISECOND_IN_A_SECOND = 1000;
const MILLISECOND_IN_A_MINUTE = 60 * MILLISECOND_IN_A_SECOND;

interface IGetWeatherInput {
  lat: string;
  lng: string;
}

const getLocationDate = (targetTimezoneOffset: number) => {
  /**
   * Should convert from local time to target location time
   * get utc time => plus with target location timezone
   */

  const localOffset = new Date().getTimezoneOffset() * MILLISECOND_IN_A_MINUTE;
  const utc = new Date().getTime() + localOffset;

  return utc + targetTimezoneOffset * MILLISECOND_IN_A_SECOND;
};

const getLocationTime = (currentTime: number, targetTimezoneOffset: number) => {
  const localOffset = new Date().getTimezoneOffset() * MILLISECOND_IN_A_MINUTE;
  const utc = currentTime * MILLISECOND_IN_A_SECOND + localOffset;
  return utc + targetTimezoneOffset * MILLISECOND_IN_A_SECOND;
};

export const getWeather = async ({ lat, lng }: IGetWeatherInput) => {
  const weatherData = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=imperial`
  );
  weatherData.data.currentTime = getLocationDate(
    weatherData.data.timezone_offset
  );

  weatherData.data.hourly.forEach((hour: any) => {
    hour.currentTime = getLocationTime(
      hour.dt,
      weatherData.data.timezone_offset
    );
  });

  weatherData.data.daily.forEach((day: any) => {
    day.dt = day.dt * MILLISECOND_IN_A_MINUTE;
  });
  return weatherData.data;
};
