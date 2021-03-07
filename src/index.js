import './css/base.scss';

const checkLocalStorage = () => {
  if (localStorage.getItem('hotelOverlookLogin') === 'manager') {
    window.location.replace('./manager-interface.html');
  } else if (localStorage.getItem('hotelOverlookLogin')) {
    window.location.replace('./customer-interface.html');
  } else {
    null;
  }
}

const login = () => {
  event.preventDefault()
  if (document.getElementById('password-field').value === 'overlook2021' && document.getElementById('username-field').value === 'manager')  {
    localStorage.setItem('hotelOverlookLogin', 'manager');
    window.location.replace('./manager-interface.html');
  } else if (document.getElementById('password-field').value === 'overlook2021' && fetch('http://localhost:3001/api/v1/customers').then(response => response.json()).then(data => data.customers.map(customer => `customer${customer.id}`).includes(document.getElementById('username-field').value))) {
    localStorage.setItem('hotelOverlookLogin', `${document.getElementById('username-field').value}`);
    window.location.replace('./customer-interface.html');
  } else {
    document.querySelector('.login-error-message').innerText = 'Username or password is incorrect'
  }
}

document.querySelector('.login-button').addEventListener('click', login);
window.addEventListener('load', checkLocalStorage);