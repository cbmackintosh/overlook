
class Guest {
  constructor(guestInfo, hotelBookings) {
    this.id = guestInfo.id;
    this.username = `customer${guestInfo.id}`
    this.name = guestInfo.name
    this.bookings = hotelBookings.filter(booking => booking.guest === this.id)
  }

  returnBookingsBefore(date) {
    return this.bookings.filter(booking => booking.date < date);
  }

  returnBookingsAfter(date) {
    return this.bookings.filter(booking => booking.date >= date);
  }

}

export default Guest;