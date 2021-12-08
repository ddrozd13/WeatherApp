// Основной JS код приложения
// ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ: Было бы очень круто, если бы в данном приложении мы применили "компонентный" подход
// Суть заключается в том, что бы создать папку components, а в ней для каждого 'компонента' создать отдельный файл с функцией
// Эта функция должна принимать необходимые ей данный, а затем возвращать заполненный HTML код. P.S. конструируем HTML с помощью шаблонных строк ``
// После описания функции ее необходимо экспортировать, а что бы ее использовать в основном коде необходимо соответственно сделать import 
// После этого элемент c помощью JS вставляется в HTML.
// Все "компоненты" я пометил в HTML с помощью аттрибута data-component
// В таком случае у нас HTML файл изначально будет практически пустым. Основные HTML элементы мы будем создавать и вставлять через JS.
// Все стили прописаны в файле index.css, главное сохранить html структуру и классы. Просто аккуратно скопировать код из index.html :) 
// Пример использования: 
/*
import Forecast from './components/forecast.js'

const initializeForecast = () => {
  const forecastContainer = Forecast(); // Передаем необходимые аргументы, например массив элементов полученный с API. В переменную forecastContainer у нас поместится html код компонента
  const forecastPlace = document.querySelector('.forecast-place'); // Место, в которое будем вставлять компонент
  forecastPlace.insertAdjacentHTML('afterbegin', forecastContainer); // Собственно метод "вставки"
}
 */
import {searchInput} from './components/search.js';
import {getCoordsCurrentUrl, API_KEY_SECOND, getCurrent, getForecast, getCoordsForecastUrl} from './api-service.js';
import {mainAdd} from './components/main.js';
import {footerAdd, getForecastItem} from './components/footer.js';


export const load = document.querySelector('.loader');
const errorText = document.querySelector('.error');


function updateDate (){
  const dateNow = document.querySelector('.date');
  let date = new Date();
  let dateDay = date.getDate();
  let dateMonth = date.getMonth() + 1;
  let dateYear = date.getFullYear();
  dateNow.innerHTML = `${dateDay}.${dateMonth}.${dateYear}`;
}
updateDate();

export function forecastNumber(item) {
  const date = new Date(item.dt * 1e3);
  const dateNumber = `${date.getDate()}`
  return dateNumber;
}
export function forecastDay(item){
  const date = new Date(item.dt * 1e3);
  const dateDay = `${date.toString().slice(0, 3)}`;
  return dateDay
}


const buttonGeolocation = document.querySelector('.button-geolocation');
buttonGeolocation.addEventListener('click', async () => {
  errorText.classList.add('hidden');
  const permission =  confirm('Даете ли вы согласие на получение вашей геолокации?');
  if(permission){
    async function success(pos) {
      document.querySelector('.loader').classList.remove('hidden');
      try {
        document.querySelector('.container-main')?.remove();
        document.querySelector('.container-forecast')?.remove();
        const crd = pos.coords;
        const getCoordCurrent = await fetch(getCoordsCurrentUrl(crd.latitude, crd.longitude, API_KEY_SECOND, 'metric'));
        const data = await getCoordCurrent.json();
        mainAdd(data, 'metric'); 
        updateTempListeners(data);
        const getCoordForecast = await fetch(getCoordsForecastUrl(crd.latitude, crd.longitude, API_KEY_SECOND, 'metric'));
        const data2 = await getCoordForecast.json();
        footerAdd();
        data2.list.forEach((item) => {
          document.querySelector('.forecast').insertAdjacentHTML('beforeend',getForecastItem(forecastDay(item),forecastNumber(item), item.weather[0].main, item.weather[0].icon, item.temp.max, item.temp.min));
        })
        document.querySelector('.container-forecast').classList.remove('hidden');
      }catch (error) {
        console.log(error);
        document.querySelector('.error').classList.remove('hidden');
      } finally {
        load.classList.add('hidden');
      }
    };
    navigator.geolocation.getCurrentPosition(success);
  }else {
    alert('Тогда введите город пожалуйста');
  }
})

export function updateTempListeners(value) {
  const tempButtons = document.querySelectorAll('.temp-type');
  for (const tempButton of tempButtons) {
    tempButton.addEventListener('click', async (event) => {
      document.querySelector('.loader').classList.remove('hidden');
      try {
        const currentType = event.target.dataset.type;

        document.querySelector('.temp-type-active')?.classList.remove('temp-type-active');
        event.target?.classList.add('temp-type-active');
  
        document.querySelector('.container-main')?.remove();
        document.querySelector('.container-forecast')?.remove();
        
        const data = await getCurrent((value) ? value.name : searchInput.value , currentType);
        mainAdd(data, currentType);
        updateTempListeners(value);  
    
        const data2 = await getForecast((value) ? value.name : searchInput.value , currentType);
        footerAdd();
        data2.list.forEach((item) => {
          document.querySelector('.forecast').insertAdjacentHTML('beforeend',getForecastItem(forecastDay(item), forecastNumber(item), item.weather[0].main, item.weather[0].icon, item.temp.max, item.temp.min));
        })
        document.querySelector('.container-forecast').classList.remove('hidden');
        
      } catch (error) {
        console.log(error);
        errorText.classList.remove('hidden');
      } finally {
        load.classList.add('hidden');
      }
    }) 
  }
}

searchInput.addEventListener('focus', () => {
  errorText.classList.add('hidden');
});


