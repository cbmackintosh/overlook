import Guest from "./Guest";

class Booking {
  constructor(bookingInfo, hotelRooms) {
    this.date = bookingInfo.date;
    this.id = bookingInfo.id;
    this.guest = bookingInfo.userID;
    this.room = hotelRooms.find(room => room.number === bookingInfo.roomNumber);
    this.roomServiceCharges = bookingInfo.roomServiceCharges;
  }
}

export default Booking;