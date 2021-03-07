
class Guest {
  constructor(guestInfo, hotelBookings) {
    this.id = guestInfo.id
    this.name = guestInfo.name
    this.bookings = hotelBookings.filter(booking => booking.guest === this.id)
  }
}

export default Guest;