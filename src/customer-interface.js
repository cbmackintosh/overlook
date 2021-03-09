import fetchData from './API-calls.js';
import Hotel from './Hotel';

const checkLocalStorage = () => {
  if (localStorage.getItem('hotelOverlookLogin') === 'manager') {
    window.location.replace('./manager-interface.html');
  } else if (localStorage.getItem('hotelOverlookLogin')) {
    loadGuestLayout(localStorage.getItem('hotelOverlookLogin'))
  } else {
    window.location.replace('./index.html');
  }
}

const loadGuestLayout = (username) => {
  console.log(username)
  fetchData()
  .then(allData => {
    let hotel = new Hotel(allData);
    let currentUser = hotel.guests.find(guest => guest.username === username);
    console.log(hotel);
    console.log(currentUser);
  })
}

window.addEventListener('load', checkLocalStorage);