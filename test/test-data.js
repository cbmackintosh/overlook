const hotelData = {
  guestData: [
    {id: 1, name: 'guest1'},
    {id: 2, name: 'guest2'},
    {id: 3, name: 'guest3'}
  ],
  roomData: [
    {number: 1, roomType: "residential suite", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 5},
    {number: 2, roomType: "suite", bidet: false, bedSize: "full", numBeds:2, costPerNight: 5},
    {number: 3, roomType: "single room", bidet: false, bedSize: "king", numBeds: 1, costPerNight: 5},
    {number: 4, roomType: "single room", bidet: false,bedSize: "queen", numBeds: 1, costPerNight: 5},
    {number: 5, roomType: "single room", bidet: true, bedSize: "queen", numBeds: 2, costPerNight: 5}
  ],
  bookingData: [
    {id: 11111111111111111, userID: 1, date: '2020/03/10', roomNumber: 1, roomServiceCharges: []},
    {id: 11111111111111112, userID: 1, date: '2020/03/11', roomNumber: 2, roomServiceCharges: []},
    {id: 11111111111111112, userID: 1, date: '2020/03/12', roomNumber: 3, roomServiceCharges: []},
    {id: 22222222222222221, userID: 2, date: '2020/03/10', roomNumber: 2, roomServiceCharges: []},
    {id: 22222222222222222, userID: 2, date: '2020/03/11', roomNumber: 3, roomServiceCharges: []},
    {id: 22222222222222223, userID: 2, date: '2020/03/12', roomNumber: 4, roomServiceCharges: []},
    {id: 33333333333333331, userID: 3, date: '2020/03/10', roomNumber: 3, roomServiceCharges: []},
    {id: 33333333333333332, userID: 3, date: '2020/03/11', roomNumber: 4, roomServiceCharges: []},
    {id: 33333333333333333, userID: 3, date: '2020/03/12', roomNumber: 5}
  ]
}

module.exports = hotelData;



