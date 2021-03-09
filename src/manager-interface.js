
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
    box_fill: 'none',
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
    legend_visible: false,
    box_fill: 'none',
    yAxis_alternateGridFill: 'none',
    yAxis_defaultTick_gridLine: {visible: false},
    xAxis_defaultTick_gridLine: {visible: false},
    title_label_text: `$${hotel.getDailyRevenue(date).toFixed(2)} Revenue for ${date}`,
    series: [
      {
        points: hotel.getRevenueDataForWeek(returnSevenDatesBefore(date))
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

const returnSevenDatesBefore = (dateInput) => {
  const result = [];
  for (var i=0; i<7; i++) {
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

document.querySelector('.log-out-button').addEventListener('click', logOut)
window.addEventListener('load', checkLocalStorage)