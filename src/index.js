// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

import fetchData from './API-calls.js';
import Hotel from './Hotel';

const loadApp = () => {
  fetchData()
  .then(allData => {
    let hotel = new Hotel(allData);
    console.log(hotel);
  })
}

window.addEventListener('load', loadApp);
