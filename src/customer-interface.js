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
    const hotel = new Hotel(allData);
    const currentUser = hotel.guests.find(guest => guest.username === username);
    displayProfileInformation(currentUser)
    setDate()
    document.querySelector('.room-search-submit').addEventListener('click', function() { searchVacancies(hotel, currentUser) })
  })
}

const setDate = () => {
  let today;
  new Date().getDate() < 10 ? today = `0${new Date().getDate()}` : today = `${new Date().getDate()}`;
  let currentMonth;
  new Date().getMonth() + 1 < 10 ? currentMonth = `0${new Date().getMonth() + 1}` : currentMonth = `${new Date().getMonth() + 1}`;
  let date = `${new Date().getFullYear()}/${currentMonth}/${today}`;
  // document.getElementById('checkin-date').min = date.replaceAll('/', '-');
  console.log(date);
}

const displayProfileInformation = (currentUser) => {
  document.querySelector('.profile-full-name').innerText = currentUser.name;
  document.querySelector('.profile-username').innerText = currentUser.username;
}

const searchVacancies = (hotel, currentUser) => {
  event.preventDefault();
  document.querySelector('main').innerHTML = ``;
  let searchDate = document.getElementById('checkin-date').value.replaceAll('-', '/')
  let searchResults = hotel.findAvailableRooms(searchDate, document.getElementById('room-type').value)
  if (searchResults.length) {
    searchResults.map(result => {
      document.querySelector('main').innerHTML += `
      <div class='search-result'>
          <div class='search-card-header'>
            <h2>${convertToTitleCase(result.roomType)}(#${result.number})</h2>
            <h2>$${result.costPerNight.toFixed(2)}</h2>
          </div>
          <div class='search-card-details'>
            <p class='bed-size'>BED SIZE: ${convertToTitleCase(result.bedSize)}</p>
            <p class='num-beds'>NUMBER OF BEDS: ${result.numBeds}</p>
            <p class='bidet'>BIDET: ${result.bidet ? 'Yes' : 'No'}</p>
          </div>
          <button id='${result.number}' class='book-now'>BOOK NOW!</button>
        </div>
      `
    })
    document.querySelectorAll('.book-now').forEach(button => button.addEventListener('click', function() {
      addBooking(currentUser, searchDate)
    }))
  } else {
    document.querySelector('main').innerHTML += `<h2 class='apology'>SORRY. THERE ARE NO AVAILABLE ROOMS MATCHING THOSE CRITERIA</h2>`
  }
}

const addBooking = (currentUser, searchDate) => {
  let roomNumber = event.target.closest('.book-now').id
  console.log(currentUser.id)
  console.log(searchDate)
  console.log(roomNumber)
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({ userID: currentUser.id, date: searchDate, roomNumber: parseInt(roomNumber) })
  })
  .then(response => response.json())
  .then(data => console.log(data))
}

const logOut = () => {
  localStorage.removeItem('hotelOverlookLogin')
  window.location.replace('./index.html')
}

function convertToTitleCase(string) {
  return string.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}

document.querySelector('.log-out-button').addEventListener('click', logOut)
window.addEventListener('load', checkLocalStorage);