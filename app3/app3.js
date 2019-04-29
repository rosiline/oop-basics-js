const Drone = require('./classes/drone.js');
const Car = require('./classes/car.js');
const { fleet } = require('./fleet-data.js');   // car and drone data
const FleetDataService = require('./services/fleet-data-service.js');

let dataService = new FleetDataService();
dataService.loadData(fleet); // populates the data service arrays

console.log(dataService.cars); // prints array of cars

for (let car of dataService.cars) { //prints licenses
  console.log(car.license);
}

let car = dataService.getCarByLicense('AT9900'); // 7. querying car by license
console.log(car);

let cars = dataService.getCarsSortedByLicense(); // 7. sort cars array by license
for (let car of cars) { // logging sorted licenses
  console.log(car.license);
}

let filteredCars = dataService.filterCarsByMake('e'); // 8. filter cars with 'u' in make
for (let car of filteredCars) {
  console.log(car.make);
}