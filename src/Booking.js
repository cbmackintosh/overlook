import Guest from "./Guest";

class Booking {
  constructor(bookingInfo) {
    this.date = bookingInfo.date;
    this.id = bookingInfo.id;
    this.guest = bookingInfo.userID;
    this.room = bookingInfo.roomNumber;
    this.roomServiceCharges = bookingInfo.roomServiceCharges;
  }
}

export default Booking;