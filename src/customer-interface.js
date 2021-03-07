import fetchData from './API-calls.js';
import Hotel from './Hotel';
import './images/user.png';
import './css/customer-interface.scss';


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
  fetchData()
  .then(allData => {
    let hotel = new Hotel(allData);
    let currentUser = hotel.guests.find(guest => guest.username === username);
    displayProfileInformation(currentUser)
    console.log(hotel)
  })
}

const displayProfileInformation = (currentUser) => {
  document.querySelector('.profile-full-name').innerText = currentUser.name;
  document.querySelector('.profile-username').innerText = currentUser.username;
}

const searchVacancies = () => {
  event.preventDefault();
  console.log(hotel)
}

const logOut = () => {
  localStorage.removeItem('hotelOverlookLogin')
  window.location.replace('./index.html')
}

document.querySelector('.room-search-submit').addEventListener('click', searchVacancies)
document.querySelector('.log-out-button').addEventListener('click', logOut)
window.addEventListener('load', checkLocalStorage);