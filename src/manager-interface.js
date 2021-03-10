
import fetchData from './API-calls.js';
import Hotel from './Hotel';
import './css/manager-interface.scss';
import * as JSC from 'jscharting';

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
    const hotel = new Hotel(allData);
    const date = setDate()
    displayChartSummaries(hotel, date)
    document.querySelector('.refresh-report').addEventListener('click', function() {
      displayChartSummaries(hotel, document.querySelector('.report-date').value.replaceAll('-', '/'))
    })
    document.querySelector('.search-guests-button').addEventListener('click', function() {
      searchGuests(hotel, date);
    })
    if (!document.querySelector('.guest-information').classList.value.includes('hidden')) {
      const selectedGuest = hotel.guests.find(guest => guest.id === parseInt(document.querySelector('.guest-information').id))
      document.querySelector('.view-guest-future').addEventListener('click', function () {
        displayGuestUpcomingBookings(selectedGuest, date, hotel)
      })
      document.querySelector('.room-search-submit').addEventListener('click', function() {
        document.getElementById('checkin-date').value ? searchVacancies(hotel, selectedGuest) : event.preventDefault();
      })
    }
  })
}

const displayChartSummaries = (hotel, date) => {
  document.querySelector('.daily-report-header').innerText = `DAILY REPORT FOR ${date}`
  compileOccupancyChart(hotel, date)
  compileRevenueChart(hotel, date)
}

const compileOccupancyChart = (hotel, date) => {
  const chart = new JSC.Chart('chartDiv-occupancy', {
    legend_visible: false,
    tabIndex: "auto",
    description: `Pie chart comparing the number of occupied and unoccupied rooms at the hotel for ${date}`,
    type: "pie",
    box_fill: 'none',
    title_label_text: `Occupancy for ${date}`,
    series: [
      {
        points: [
          {
            x: "OCCUPIED", 
            y: hotel.returnNumberOfOccupiedRoomsFor(date), 
            color: "red", 
            description:`${hotel.returnNumberOfOccupiedRoomsFor(date)} were occupied on ${date}`
          }, 
          { 
            x: "VACANT", 
            y: hotel.returnNumberOfUnoccupiedRoomsFor(date), 
            color: "green",
            description: `${hotel.returnNumberOfOccupiedRoomsFor(date)} were vacant on ${date}`
          }
        ]
      }
    ]
  })
}

const compileRevenueChart = (hotel, date) => {
  const dataPoints = hotel.getRevenueDataForWeek(returnSevenDatesBefore(date))
  dataPoints.forEach(point => point.description = `Hotel revenue on ${point.y} was $${point.x}`)
  const chart = new JSC.Chart('chartDiv-revenue', {
    legend_visible: false,
    tabIndex: "auto",
    description: `Line chart showing hotel revenue for the week preceding ${date}`,
    box_fill: 'none',
    yAxis_alternateGridFill: 'none',
    yAxis_defaultTick_gridLine: {visible: false},
    xAxis_defaultTick_gridLine: {visible: false},
    title_label_text: `$${hotel.getDailyRevenue(date).toFixed(2)} Revenue for ${date}`,
    series: [
      {
        points: dataPoints
      }
    ]
  })
}

const searchGuests = (hotel, date) => {
  document.querySelector('.guest-information').classList.add('hidden');
  document.querySelector('.guest-search-result-section').innerHTML = ``;
  document.querySelector('.guest-search-result-section').classList.remove('hidden')
  hotel.searchGuestsByName(document.querySelector('.guest-search-bar').value)
  .map(result => document.querySelector('.guest-search-result-section').innerHTML += `
    <div class='guest-search-result' id=${result.id}>
      <h3>${result.name}</h3>
      <p>${result.username}</h3>
    </div>
  `)
  document.querySelectorAll('.guest-search-result').forEach(result => result.addEventListener('click', function() {
    displayGuestDetails(hotel, date)
  }))
}

const displayGuestDetails = (hotel, date) => {
  const selectedGuest = hotel.guests.find(guest => guest.id === parseInt(event.target.closest('.guest-search-result').id));
  let totalBookingsCost = selectedGuest.returnBookingsBefore(date).reduce((total, booking) => total += hotel.rooms.find(room => room.number === booking.room).costPerNight, 0)
  let totalRoomServiceCharges = selectedGuest.returnBookingsBefore(date).map(booking => booking.roomServiceCharges).flat().reduce((total, charge) => total += charge, 0)
  let totalExpenditures = totalBookingsCost + totalRoomServiceCharges;
  document.querySelector('.guest-search-result-section').classList.add('hidden');
  document.querySelector('.guest-information').classList.remove('hidden');
  document.querySelector('.guest-information').id = selectedGuest.id;
  document.querySelector('.guest-name').innerText = selectedGuest.name;
  document.querySelector('.guest-username').innerText = selectedGuest.username;
  document.querySelector('.guest-total-expenditures').innerText = `TOTAL EXPENDITURES: $${totalExpenditures.toFixed(2)}`
  document.querySelector('.view-guest-future').addEventListener('click', function () {
    displayGuestUpcomingBookings(selectedGuest, date, hotel)
  })
  document.querySelector('.view-guest-history').addEventListener('click', function() {
    displayGuestBookingHistory(selectedGuest, date, hotel)
  })
  document.querySelector('.room-search-submit').addEventListener('click', function() {
    document.getElementById('checkin-date').value ? searchVacancies(hotel, selectedGuest) : event.preventDefault();
  })
}

const displayGuestBookingHistory = (guest, date, hotel) => {
  document.querySelector('.right-column').innerHTML = ``;
  guest.returnBookingsBefore(date)
  .map(booking => {
    document.querySelector('.right-column').innerHTML += `
      <div class='past-booking'>
        <h2>${booking.date}</h2>
        <p>BOOKING #${booking.id}</p>
        <h3>${convertToTitleCase(hotel.rooms.find(room => room.number === booking.room).roomType)} (ROOM #${hotel.rooms.find(room => room.number === booking.room).number})</h3>
        <p>BILL TOTAL: $${hotel.rooms.find(room => room.number === booking.room).costPerNight + booking.roomServiceCharges.reduce((total, charge) => total += charge, 0)}</p>
      </div>
    `
  })
}

const searchVacancies = (hotel, guest) => {
  event.preventDefault()
  document.querySelector('.right-column').innerHTML = ``;
  let searchDate = document.getElementById('checkin-date').value.replaceAll('-', '/')
  let searchResults = hotel.findAvailableRooms(searchDate, document.getElementById('room-type').value)
  if (searchResults.length) {
    searchResults.map(result => {
      document.querySelector('.right-column').innerHTML += `
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
      addBooking(guest, searchDate)
    }))
  } else {
    document.querySelector('.right-column').innerHTML = `<h2 class='apology'>SORRY. THERE ARE NO AVAILABLE ROOMS MATCHING THOSE CRITERIA</h2>`
  }
}

const addBooking = (guest, searchDate) => {
  let roomNumber = event.target.closest('.book-now').id
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({ userID: guest.id, date: searchDate, roomNumber: parseInt(roomNumber) })
  })
  .then(handleErrors)
  .then(response => response.json())
  .then(data => {
    document.querySelector('.right-column').innerHTML = `
      <h2 class='booking-confirmation-header'>BOOKING SUCCESSFUL</h2>
      <p>CONFIRMATION NUMBER: ${data.newBooking.id}</p>
      <p>CHECK-IN DATE: ${data.newBooking.date}<p>
    `
  })
  refreshUserData()
  .catch(error => document.querySelector('.right-column').innerHTML = '<h2>Something went wrong, please try again later.</h2>')
}

function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}

const displayGuestUpcomingBookings = (guest, date, hotel) => { 
  document.querySelector('.right-column').innerHTML = ``
  if(!guest.returnBookingsAfter(date).length) {
    document.querySelector('.right-column').innerHTML = `<h1>${guest.name} has no upcoming bookings</h1>`
  } else {
    document.querySelector('.right-column').innerHTML = `<h1>UPCOMING BOOKINGS</h1>`
    guest.returnBookingsAfter(date).map(booking => document.querySelector('.right-column').innerHTML += `
      <div class='future-booking'>
        <h2>${booking.date}</h2>
        <p>ROOM #${hotel.rooms.find(room => room.number === booking.room).number}</p>
        <p>${convertToTitleCase(hotel.rooms.find(room => room.number === booking.room).roomType)}</p>
        <p>BOOKING #${booking.id}</p>
        <button id='${booking.id}' class='cancel-booking-button'>CANCEL BOOKING</button>
      </div>
    `)
    document.querySelectorAll('.cancel-booking-button').forEach(button => button.addEventListener('click', function() {
      cancelBooking(guest)
    }))
  }
}

const cancelBooking = (guest) => {
  fetch(`http://localhost:3001/api/v1/bookings/${event.target.closest('.cancel-booking-button').id}`, {
    method: 'DELETE',
    headers: {'Content-Type' : 'application/json'},
  })
  .then(response => response.json())
  .then(data => document.querySelector('.right-column').innerHTML = `
    <h1>BOOKING CANCELED</h1>
    <p>${data.message}</p>
  `)
  refreshUserData()
}

const setDate = () => {
  let today;
  new Date().getDate() < 10 ? today = `0${new Date().getDate()}` : today = `${new Date().getDate()}`;
  let currentMonth;
  new Date().getMonth() + 1 < 10 ? currentMonth = `0${new Date().getMonth() + 1}` : currentMonth = `${new Date().getMonth() + 1}`;
  let date = `${new Date().getFullYear()}/${currentMonth}/${today}`;
  document.querySelector('.report-date').value = date.replaceAll('/', '-');
  document.querySelector('.report-date').max = date.replaceAll('/', '-');
  document.getElementById('checkin-date').min = date.replaceAll('/', '-');
  return date
}

const returnSevenDatesBefore = (dateInput) => {
  const result = [];
  for (let i = 0; i < 7; i++) {
    let date = new Date(dateInput);
    date.setDate(date.getDate() - i);
    result.push(`${date.getFullYear()}/${formatDate(date.getMonth() + 1)}/${formatDate(date.getDate())}`)
  }
  return result
}

const formatDate = (number) => {
  if (number < 10) {
    return `0${number}`
  } else {
    return `${number}`
  }
}

function convertToTitleCase(string) {
  return string.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}

async function refreshUserData() {
  await loadManagerInterface()
}

const logOut = () => {
  localStorage.removeItem('hotelOverlookLogin')
  window.location.replace('./index.html')
}

document.querySelector('.log-out-button').addEventListener('click', logOut)
window.addEventListener('load', checkLocalStorage)