const Vehicle = require('./vehicle.js');

class Drone extends Vehicle {
  constructor(license, model, latLong) {
    super(license, model, latLong); // passes to vehicle constructor
    this.airTimeHours = null;
    this.base = null;
  }
}

module.exports = Drone;