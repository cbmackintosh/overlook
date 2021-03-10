import chai from 'chai';
const expect = chai.expect;
import hotelData from './test-data'
import Booking from '../src/Booking';
import Guest from '../src/Guest';
import Hotel from '../src/Hotel';

describe('Guest', function() {

  beforeEach(function() {
    this.hotel = new Hotel(hotelData)
    this.guest = new Guest(hotelData.guestData[0], this.hotel.bookings)
  })

  it('should have a unique ID number', function() {
    expect(this.guest.id).to.deep.equal(hotelData.guestData[0].id)
  })

  it('should have a username consisting of the word customer appended to the id number', function() {
    expect(this.guest.username).to.deep.equal(`customer${hotelData.guestData[0].id}`)
  })

  it('should have a full name', function() {
    expect(this.guest.name).to.deep.equal(hotelData.guestData[0].name)
    expect(this.guest.name).to.deep.equal('guest1')
  })

  it('booking property should be an array of booking objects', function() {
    expect(this.guest.bookings.length).to.deep.equal(3)
    expect(this.guest.bookings[0]).to.be.an.instanceof(Booking)
    expect(this.guest.bookings[0].guest).to.deep.equal(this.guest.id)
    expect(this.guest.bookings[1]).to.be.an.instanceof(Booking)
    expect(this.guest.bookings[1].guest).to.deep.equal(this.guest.id)
    expect(this.guest.bookings[2]).to.be.an.instanceof(Booking)
    expect(this.guest.bookings[2].guest).to.deep.equal(this.guest.id)
  })

  it('should be able to return all bookings from before a specified date', function() {
    expect(this.guest.returnBookingsBefore('2020/03/10')).to.deep.equal([])
    expect(this.guest.returnBookingsBefore('2020/03/11')).to.deep.equal([this.guest.bookings[0]])
    expect(this.guest.returnBookingsBefore('2020/03/12')).to.deep.equal([this.guest.bookings[0], this.guest.bookings[1]])
    expect(this.guest.returnBookingsBefore('2020/03/13')).to.deep.equal([this.guest.bookings[0], this.guest.bookings[1], this.guest.bookings[2]])
  })

  it('should be able to return all bookings after and including a specified date', function() {
    expect(this.guest.returnBookingsAfter('2020/03/10')).to.deep.equal([this.guest.bookings[0], this.guest.bookings[1], this.guest.bookings[2]])
    expect(this.guest.returnBookingsAfter('2020/03/11')).to.deep.equal([this.guest.bookings[1], this.guest.bookings[2]])
    expect(this.guest.returnBookingsAfter('2020/03/12')).to.deep.equal([this.guest.bookings[2]])
    expect(this.guest.returnBookingsAfter('2020/03/13')).to.deep.equal([])
  })

})