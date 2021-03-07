
import fetchData from './API-calls.js';
import Hotel from './Hotel';

const loadApp = () => {
  fetchData()
  .then(allData => {
    let hotel = new Hotel(allData);
    console.log(hotel);
  })
}

window.addEventListener('load', loadApp)