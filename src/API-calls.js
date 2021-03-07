
export const fetchData = () => {
  let guestData =  fetch("http://localhost:3001/api/v1/customers")
      .then(response => response.json())
      .then(guestData => {
          return guestData
      })
      .catch(err => displayError(err))

  let bookingData = fetch("http://localhost:3001/api/v1/bookings")
      .then(response => response.json())
      .then(bookingData => {
          return bookingData;
      })
      .catch(err => displayError(err))

  let roomData = fetch("http://localhost:3001/api/v1/rooms")
      .then(response => response.json())
      .then(roomData => {
          return roomData;
      })
      .catch(err => displayError(err))

      return Promise.all([guestData, bookingData, roomData])
      .then(data => {
        let allData = {}
        allData.guestData = data[0].customers;
        allData.bookingData = data[1].bookings;
        allData.roomData = data[2].rooms;
        return allData;
      });
}

export default fetchData;
