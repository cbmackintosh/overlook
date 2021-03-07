
import fetchData from './API-calls.js';
import Hotel from './Hotel';

const checkLocalStorage = () => {
  if (localStorage.getItem('hotelOverlookLogin') === 'manager') {
    loadManagerInterface();
  } else if (localStorage.getItem('hotelOverlookLogin')) {
    window.location.replace('./customer-interface.html');
  } else {
    window.location.replace('./index.html');
  }
}

const loadManagerInterface = () => {
  fetchData()
  .then(allData => {
    let hotel = new Hotel(allData);
    console.log(hotel);
  })
}

window.addEventListener('load', checkLocalStorage)