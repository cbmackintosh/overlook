
import Room from './Room'
import Guest from './Guest'
import Booking from './Booking'

class Hotel {
  constructor(hotelData) {
    this.bookings = hotelData.bookingData.map(bookingInfo => new Booking(bookingInfo))
    this.rooms = hotelData.roomData.map(roomInfo => new Room(roomInfo, this.bookings))
    this.guests = hotelData.guestData.map(guestInfo => new Guest(guestInfo, this.bookings))
  }

  findAvailableRooms(date, roomType) {
    if (roomType === 'all-rooms') {
      return this.rooms.filter(room => !room.bookings.map(booking => booking.date).includes(date));
    } else {
      return this.rooms.filter(room => !room.bookings.map(booking => booking.date).includes(date)).filter(room => room.roomType === roomType);
    }
  }
}

export default Hotel;