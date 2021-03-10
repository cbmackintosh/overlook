import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/Hotel';
import Guest from '../src/Guest';
import Booking from '../src/Booking';
import Room from '../src/Room';
import hotelData from './test-data'

describe('Room', function() {

  beforeEach(function() {
    this.hotel = new Hotel(hotelData)
    this.room = new Room(hotelData.roomData[2], this.hotel.bookings)
  })

  it('should be an instance of the Room object', function() {
    expect(this.room).to.be.an.instanceof(Room)
    expect(this.room).to.deep.equal(this.hotel.rooms[2])
  })

  it('should have a unique room number', function() {
    expect(this.room.number).to.deep.equal(hotelData.roomData[2].number)
    expect(this.room.number).to.deep.equal(this.hotel.rooms[2].number)
  })

  it('should have a room type', function() {
    expect(this.room.roomType).to.deep.equal('single room')
    expect(this.room.roomType).to.deep.equal(this.hotel.rooms[2].roomType)
    expect(this.room.roomType).to.deep.equal(hotelData.roomData[2].roomType)
  })

  it('should indicate whether or not the room is equipped with a bidet', function() {
    expect(typeof this.room.bidet).to.deep.equal('boolean')
    expect(this.room.bidet).to.deep.equal(false)
    expect(this.room.bidet).to.deep.equal(this.hotel.rooms[2].bidet)
    expect(this.room.bidet).to.deep.equal(hotelData.roomData[2].bidet)
  })

  it('should have a bed size', function() {
    expect(this.room.bedSize).to.deep.equal('king')
    expect(this.room.bedSize).to.deep.equal(this.hotel.rooms[2].bedSize)
    expect(this.room.bedSize).to.deep.equal(hotelData.roomData[2].bedSize)
  })

  it('should indicate the number of beds in the room', function() {
    expect(typeof this.room.numBeds).to.deep.equal('number')
    expect(this.room.numBeds).to.deep.equal(this.hotel.rooms[2].numBeds)
    expect(this.room.numBeds).to.deep.equal(hotelData.roomData[2].numBeds)
    expect(this.room.numBeds).to.deep.equal(1)
  })

  it('should indicate the cost per night for the room', function() {
    expect(typeof this.room.costPerNight).to.deep.equal('number')
    expect(this.room.costPerNight).to.deep.equal(this.hotel.rooms[2].costPerNight)
    expect(this.room.costPerNight).to.deep.equal(hotelData.roomData[2].costPerNight)
    expect(this.room.costPerNight).to.deep.equal(5)
  })

  it('bookings property should be an array of Booking objects', function() {
    expect(this.room.bookings[0]).to.be.an.instanceof(Booking)
    expect(this.hotel.bookings.includes(this.room.bookings[0])).to.deep.equal(true)
  })
})