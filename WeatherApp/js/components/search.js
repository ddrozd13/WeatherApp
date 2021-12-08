import {mainAdd} from './main.js';
import {footerAdd, getForecastItem} from './footer.js';
import { getCurrent,getForecast} from '../api-service.js';
import {updateTempListeners, load, forecastNumber, forecastDay} from '../index.js';


export const searchInput = document.querySelector('.input--search');
const searchButton = document.querySelector('.button--search');




searchButton.addEventListener('click', async () => {
  document.querySelector('.loader').classList.remove('hidden');

  try {
    document.querySelector('.container-main')?.remove();
    document.querySelector('.container-forecast')?.remove();
    const data = await getCurrent(searchInput.value, 'metric');
    mainAdd(data, 'metric'); 
    updateTempListeners();

    const data2 = await  getForecast(searchInput.value, 'metric')
    footerAdd();
    data2.list.forEach((item) => {
      document.querySelector('.forecast').insertAdjacentHTML('beforeend',getForecastItem(forecastDay(item), forecastNumber(item), item.weather[0].main, item.weather[0].icon, item.temp.max, item.temp.min));
    })
    document.querySelector('.container-forecast').classList.remove('hidden');
    
  } catch (error) {
    console.log(error);
    document.querySelector('.error').classList.remove('hidden');
  } finally {
    load.classList.add('hidden');
  }

  searchInput.value = "";
});