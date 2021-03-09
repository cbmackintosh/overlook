class Room {
  constructor(roomInfo, hotelBookings) {
    this.number = roomInfo.number;
    this.roomType = roomInfo.roomType;
    this.bidet = roomInfo.bidet;
    this.bedSize = roomInfo.bedSize;
    this.numBeds = roomInfo.numBeds;
    this.costPerNight = roomInfo.costPerNight;
    this.bookings = hotelBookings.filter(booking => booking.room === this.number);
  }
}

export default Room;