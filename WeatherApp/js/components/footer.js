export function footerAdd() {
  document.querySelector('body').insertAdjacentHTML('beforeend', `
    <div class="container container-forecast" data-component="">
      <div class="container-title">16-day forecast</div>
      <div class="forecast">
      </div>
    </div>
  `)
}
export function getForecastItem(day, date, weather, icon, tempMax, tempMin){
  const typeActive = document.querySelector('.temp-type-active');
  return `
  <div class="forecast-item">
    <div class="fotecast-item-date">${day}, May ${date}</div>
    <div class="fotecast-item-type">${weather}</div>
    <img class="forecast-item-icon" src="http://openweathermap.org/img/wn/${icon}@2x.png"></img>
    <div class="forecast-item-temp">${Math.floor(tempMax)} ${typeActive.textContent === '°F' ? '°F' : '°C'} / ${Math.floor(tempMin)} ${typeActive.textContent === '°F' ? '°F' : '°C'}</div>
  </div>
  `
}