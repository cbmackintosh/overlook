import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/Booking';
import hotelData from './test-data'

describe('Booking', function() {

  beforeEach(function() {
    this.booking = new Booking(hotelData.bookingData[0])
  })

  it('should have a unique id number in integer form', function() {
    expect(this.booking.id).to.deep.equal(hotelData.bookingData[0].id)
    expect(typeof this.booking.id).to.deep.equal('number')
  })

  it('should have a date', function() {
    expect(this.booking.date).to.deep.equal(hotelData.bookingData[0].date)
  })

  it('should be associated with a guest id number', function() {
    expect(this.booking.guest).to.deep.equal(hotelData.bookingData[0].userID)
    expect(this.booking.guest).to.deep.equal(hotelData.guestData[0].id)
    expect(typeof this.booking.guest).to.deep.equal('number')
  })

  it('should be associated with a specific room number', function() {
    expect(this.booking.room).to.deep.equal(hotelData.bookingData[0].roomNumber)
    expect(this.booking.room).to.deep.equal(hotelData.roomData[0].number)
    expect(typeof this.booking.room).to.deep.equal('number')
  })

  it('should start with an empty array for roomService charges', function() {
    expect(this.booking.roomServiceCharges).to.deep.equal([])
  })

  it('should create an empty array for room service charges if undefined in the server data', function() {
    const booking2 = new Booking(hotelData.bookingData[hotelData.bookingData.length - 1])
    expect(booking2.roomServiceCharges).to.deep.equal([]);
  })

})