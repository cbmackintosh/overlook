
import Room from './Room'
import Guest from './Guest'
import Booking from './Booking'

class Hotel {
  constructor(hotelData) {
    this.rooms = hotelData.roomData.map(roomInfo => new Room(roomInfo))
    this.bookings = hotelData.bookingData.map(bookingInfo => new Booking(bookingInfo, this.rooms, hotelData.guestData))
    this.guests = hotelData.guestData.map(guestInfo => new Guest(guestInfo, this.bookings))
  }
}

export default Hotel;