export function mainAdd (value, type){
  const timeBefore = new Date(value.sys.sunrise * 1e3);
  const timeSunrise = `${timeBefore.getHours()} : ${timeBefore.getMinutes()}`;
  const timeAfter = new Date(value.sys.sunset * 1e3);
  const timeSunset = `${timeAfter.getHours()} : ${timeAfter.getMinutes()}`
  const temp = Math.round(value.main.temp);
  const tempMin = Math.floor(value.main.temp_min);
  const tempMax = Math.round(value.main.temp_max);

  const activeMetric = type === 'metric';
  
  document.querySelector('body').insertAdjacentHTML('beforeend', `
  <div class="container container-main" data-component>
    <img src="./images/loading.svg" class="loader hidden"></img>
    <div class="main-body">
      <div class="main-info" data-component>
        <div class="city">
          <span class="uppercase">${value.name}</span> 
          <span class="type">${value.weather[0].description}</span>
        </div>
        <img class="icon" src="http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png" />
        <div class="temp">
          <div class="temp-value">
            <div>${temp}</div> 
            <div class="temp-controls">
              <button class="temp-type ${activeMetric ? 'temp-type-active' : ''}" data-type="metric">°C</button>
              <span>|</span>
              <button class="temp-type ${!activeMetric ? 'temp-type-active' : ''}" data-type="imperial">°F</button>
            </div>
          </div>
          <div>(min. ${tempMin} ${!activeMetric ? '°F' : '°C'} / max. ${tempMax} ${!activeMetric ? '°F' : '°C'})</div> 
        </div>
      </div>
      <div class="info" data-component>
        <div class="info-row" data-component>
          <div class="info-row-label">Wind</div>
          <div class="info-row-value">${value.wind.speed} ${!activeMetric ? 'm/h' : 'm/s'}</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">Humidity</div>
          <div class="info-row-value">${value.main.humidity} %</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">Pressure</div>
          <div class="info-row-value">${value.main.pressure} mb</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">Clound</div>
          <div class="info-row-value">${value.clouds.all} %</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">Sunrise</div>
          <div class="info-row-value">${timeSunrise}</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">Sunset</div>
          <div class="info-row-value">${timeSunset}</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">Visibility</div>
          <div class="info-row-value">${value.visibility/1000} km</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">Rain</div>
          <div class="info-row-value">${(value.rain) ? (value.rain['1h']) : '-'} mm</div>
        </div>
      </div>
    </div>
  </div>
  `);
}