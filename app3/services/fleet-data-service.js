const Drone = require('../classes/drone.js');
const Car = require('../classes/car.js');
const DataError = require('./data-error.js');

class FleetDataService { //1.
  constructor() {
    this.cars = [];
    this.drones = [];
    this.errors = []; // 5. for error handling errors will be pushed here so data can continue to be processed
  }

  loadData(fleet) { // 2. loads fleet data and pushes into correct array based on type
    for (let data of fleet) {
      switch (data.type) {
        case 'car':
          if (this.validateCarData(data)) { // 6. validate data if invalid then push to errors
            let car = this.loadCar(data); // dont need type so will extract just the data needed to push
            if (car) this.cars.push(car); // in case of error loadCar returns null, need to check car is truthy
            break;
          } else {
            let e = new DataError('invalid car data', data);
            this.errors.push(e);
          }
        case 'drone':
          let drone = this.loadDrone(data);
          this.drones.push(drone);
          break;
        default: // 5.[error handling] if it doesnt match any cases it will execute default code
          let e = new DataError('Invalid Vehicle Type', data);
          this.errors.push(e);
          break;
      }
    }
  }

  getCarByLicense(license) { // 7. querying car by license
    return this.cars.find(car => car.license === license); // if not found returns undefined
  }

  getCarsSortedByLicense() { // 7. sorting cars alphabetically by license
    return this.cars.sort(function (car1, car2) {
      if (car1.license < car2.license) { return -1 };
      if (car1.license > car2.license) { return 1 };
      return 0;
    });
  }

  filterCarsByMake(filter) {
    return this.cars.filter(car => car.make.includes(filter)); // returns true or false if car make includes filter
  }

  loadCar(car) {
    try {
      let c = new Car(car.license, car.model, car.latLong);
      c.miles = car.miles;
      c.make = car.make;
      return c;
    } catch (e) { // 5.[error handling] in case there are any errors loading the car
      this.errors.push(new DataError('error loading car', car));
    }
    return null; // in case the car above isnt returned
  }

  loadDrone(drone) {
    try {
      let d = new Drone(drone.license, drone.model, drone.latLong);
      d.airTimeHours = drone.airTimeHours;
      d.base = drone.base;
      return d;
    } catch (e) { // 5.[error handling] in case there is an error loading drone
      this.errors.push(new DataError('error loading drone', drone));
    }
    return null; // 5.in case the drone above isnt returned when theres an error
  }

  validateCarData(car) { // 6. validating that car has all required properties
    const requiredProps = ['license', 'model', 'latLong', 'miles', 'make'];
    let hasErrors = false; // will assign to true in case of error
    for (let field of requiredProps) {
      if (!car[field]) {
        this.errors.push(new DataError(`invalid field ${field}`, car));
        hasErrors = true;
      }
    }
    if (Number.isNaN(Number.parseFloat(car.miles))) { //6. validating that mileage is a number
      this.errors.push(new DataError('invalid mileage', car));
      hasErrors = true;
    }
    return !hasErrors; // returns true if no errors or false if there is an error
  }
}

module.exports = FleetDataService;

/*
Order of code added:
1. creating data service class
2. loading data
3. creating core classes
4. populating classes
5. handling data errors
6. validating data
7. querying and sorting data
8. filtering data
*/