
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
    console.log(hotel)
    const date = setDate()
    displayChartSummaries(hotel, date)
    document.querySelector('.refresh-report').addEventListener('click', function() {
      displayChartSummaries(hotel, document.querySelector('.report-date').value.replaceAll('-', '/'))
    })
  })
}

const displayChartSummaries = (hotel, date) => {
  document.querySelector('.daily-report-header').innerText = `DAILY REPORT FOR ${date}`
  
  compileOccupancyChart(hotel, date)
  compileRevenueChart(hotel, date)
}

const compileOccupancyChart = (hotel, date) => {
  const chart = new JSC.Chart('chartDiv-occupancy', {
    type: "pie",
    title_label_text: `Occupancy for ${date}`,
    series: [
      {
        points: [{ x: "OCCUPIED", y: hotel.returnNumberOfOccupiedRoomsFor(date), color: "red"}, { x: "VACANT", y: hotel.returnNumberOfUnoccupiedRoomsFor(date), color: "green" }]
      }
    ]
  })
}

const compileRevenueChart = (hotel, date) => {
  const chart = new JSC.Chart('chartDiv-revenue', {
    series: [
      {
        points: [{ x: "A", y: 10 }, { x: "B", y: 5 }]
      }
    ]
  })
}


const setDate = () => {
  let today;
  new Date().getDate() < 10 ? today = `0${new Date().getDate()}` : today = `${new Date().getDate()}`;
  let currentMonth;
  new Date().getMonth() + 1 < 10 ? currentMonth = `0${new Date().getMonth() + 1}` : currentMonth = `${new Date().getMonth() + 1}`;
  let date = `${new Date().getFullYear()}/${currentMonth}/${today}`;
  document.querySelector('.report-date').value = date.replaceAll('/', '-');
  document.querySelector('.report-date').max = date.replaceAll('/', '-');
  return date
}


window.addEventListener('load', checkLocalStorage)