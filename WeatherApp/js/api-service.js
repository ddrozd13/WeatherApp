// Тут пишем код для обращения к API
// В данном задании мы используем 2 API с openweather
// 1. https://openweathermap.org/current
// 2. https://openweathermap.org/forecast16
// Код для обращения к API через fetch() смотрим по этим ссылкам в документации
// Тут должно быть 2 функции: получение информации о городе (current) и функция получения прогноза погоды на 16-дней.
// P.S. Помните, что для обращени к API необходимо использовать свой API_KEY


export const getCurrentApiUrl = (city, apiKey, units) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`

export const getForecastApiUrl = (city, apiKey, units) => `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=${units}&cnt=16&appid=${apiKey}`

export const getCoordsCurrentUrl = (lat, lon, apiKey,units) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`

export const getCoordsForecastUrl = (lat, lon, apiKey, units) => `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=${units}&cnt=16&appid=${apiKey}`

export const API_KEY_SECOND = '58b6f7c78582bffab3936dac99c31b25';

export async function getCurrent(search, units){
  const API_KEY = `44bd3bcd8c07bd2ede131897332f322c`;
  const getCurrent = await fetch(getCurrentApiUrl(search, API_KEY, units));
  const response = await getCurrent.json();

  return response;
}

export async function getForecast(search, units) {
  const getForecast = await fetch(getForecastApiUrl(search, API_KEY_SECOND, units));
  const response2 = await getForecast.json();

  return response2;
}



  