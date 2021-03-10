# Overlook - Hotel Management Software

By: Cameron Mackintosh (https://github.com/cbmackintosh)

**Abstract**
The purpose of this project was to build a simple hotel management application serving two different kinds of users: a guest and a hotel manager. Both users can access the application from a common login page, but the two interfaces provide different functionality and privileges. The guest interface allows a user to view past bookings, upcoming bookings and make new bookings at the hotel. The manager's interface conversely allows the user to look up information on all guests and make/cancel bookings on their behalf. It also provides graphic data on hotel occupancy and revenue for any given day. As a front-end engineering student at Turing School of Software and Design, this project tested my newly acquired skills in making different kinds of network requests, working with Webpack, refactoring stylesheets using SASS and more.

**Screenshot of the Manager interface**
<img width="1435" alt="Screen Shot 2021-03-10 at 4 48 52 PM" src="https://user-images.githubusercontent.com/72054706/110702453-86c9ad00-81c0-11eb-8134-7dbb57666f15.png">

**Screenshot of the Guest interface**
<img width="1427" alt="Screen Shot 2021-03-10 at 4 50 12 PM" src="https://user-images.githubusercontent.com/72054706/110702571-b1b40100-81c0-11eb-9b06-141a9d7ece5a.png">

**Install instructions**
- clone this repository using `git@github.com:cbmackintosh/overlook.git`
- cd into the directory and run `npm install`
- install the JSCharting dependency for the manager interface: `npm install --save jscharting`
- also clone down this local server `https://github.com/turingschool-examples/overlook-api`, cd into it and run `npm install`
- Run `npm start` in both directories simultaneously
- access the application from your browser at localhost:8080/

**Technologies used**
<br><img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/><br>
<img src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/><br>
<img src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>

- Visual Studio Code: 1.21.1 (text editor)
- npm 6.14.8 (package manager)
- JSCharting ^3.0.2 (dependency providing chart functionality)
- Glide.js 3.4.1 https://glidejs.com/
- Mocha ^6.1.4 (test framework)
- Chai ^4.2.0 (assertion library)
