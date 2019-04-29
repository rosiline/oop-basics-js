const Vehicle = require('./vehicle.js');

class Car extends Vehicle {
  constructor(license, model, latLong) {
    super(license, model, latLong); // passes to vehicle constructor
    this.miles = null;
    this.make = null;
  }
}

module.exports = Car;