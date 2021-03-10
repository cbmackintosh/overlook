import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/Hotel';
import Guest from '../src/Guest';
import Booking from '../src/Booking';
import Room from '../src/Room';
import hotelData from './test-data'

describe('Hotel', function() {

  beforeEach(function () {
    this.hotel = new Hotel(hotelData)
  })

  it('guests property should be an array of guest objects', function() {
    expect(this.hotel.guests.length).to.deep.equal(3);
    expect(this.hotel.guests[0]).to.be.an.instanceof(Guest);
    expect(this.hotel.guests[1]).to.be.an.instanceof(Guest);
    expect(this.hotel.guests[2]).to.be.an.instanceof(Guest);
  });

  it('bookings property should be an array of booking objects', function() {
    expect(this.hotel.bookings.length).to.deep.equal(9);
    expect(this.hotel.bookings[0]).to.be.an.instanceof(Booking);
    expect(this.hotel.bookings[1]).to.be.an.instanceof(Booking);
    expect(this.hotel.bookings[2]).to.be.an.instanceof(Booking);
  });

  it('rooms property should be an array of room objects', function() {
    expect(this.hotel.rooms.length).to.deep.equal(5);
    expect(this.hotel.rooms[0]).to.be.an.instanceof(Room);
    expect(this.hotel.rooms[1]).to.be.an.instanceof(Room);
    expect(this.hotel.rooms[2]).to.be.an.instanceof(Room);
  });

  it('should be able to search available rooms by date and roomType', function() {
    expect(this.hotel.findAvailableRooms('2020/03/10', 'all-rooms')).to.deep.equal([this.hotel.rooms[3], this.hotel.rooms[4]])
    expect(this.hotel.findAvailableRooms('2020/03/10', 'single room')).to.deep.equal([this.hotel.rooms[3], this.hotel.rooms[4]])
    expect(this.hotel.findAvailableRooms('2020/03/13', 'suite')).to.deep.equal([this.hotel.rooms[1]])
    expect(this.hotel.findAvailableRooms('2020/03/13', 'all-rooms')).to.deep.equal(this.hotel.rooms)
  });

  it('should be able to return the number of occupied rooms on any given day', function() {
    expect(this.hotel.returnNumberOfOccupiedRoomsFor('2020/03/10')).to.deep.equal(3)
    expect(this.hotel.returnNumberOfOccupiedRoomsFor('2020/03/13')).to.deep.equal(0)
  })

  it('should be able to return the number of unoccupied rooms on any given day', function() {
    expect(this.hotel.returnNumberOfUnoccupiedRoomsFor('2020/03/10')).to.deep.equal(2)
    expect(this.hotel.returnNumberOfUnoccupiedRoomsFor('2020/03/13')).to.deep.equal(5)
  }) 

  it('should be able to calculate the total revenue on any given day', function() {
    expect(this.hotel.getDailyRevenue('2020/03/10')).to.deep.equal(15)
    expect(this.hotel.getDailyRevenue('2020/03/13')).to.deep.equal(0)
  })

  it('should be able to return a weeks worth of revenue data formated as a series of chart coordinates', function() {
    const week = ['2020/03/13', '2020/03/12', '2020/03/11', '2020/03/10', '2020/03/09', '2020/03/08', '2020/03/07']
    const coordinates = [
      {x: '2020/03/13', y: 0}, 
      {x: '2020/03/12', y: 15}, 
      {x: '2020/03/11', y: 15}, 
      {x: '2020/03/10', y: 15}, 
      {x: '2020/03/09', y: 0}, 
      {x: '2020/03/08', y: 0}, 
      {x: '2020/03/07', y: 0}
    ]
    expect(this.hotel.getRevenueDataForWeek(week)).to.deep.equal(coordinates)
  })

  it('should be able to search guests by name or partial name', function() {
    expect(this.hotel.searchGuestsByName('ues').length).to.deep.equal(3)
    expect(this.hotel.searchGuestsByName('1').length).to.deep.equal(1)
    expect(this.hotel.searchGuestsByName('guest1')).to.deep.equal([this.hotel.guests[0]])
    expect(this.hotel.searchGuestsByName('1')).to.deep.equal([this.hotel.guests[0]])
    expect(this.hotel.searchGuestsByName('2')).to.deep.equal([this.hotel.guests[1]])
    expect(this.hotel.searchGuestsByName('3')).to.deep.equal([this.hotel.guests[2]])
  })

});
