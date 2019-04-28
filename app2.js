class Vehicle {
  constructor(licenseNum) {
    this.licenseNum = licenseNum;
    this.gpsEnabled = true;
  }

  start() { // ##
    console.log('starting Vehicle');
  }

  static getCompanyName() { // ###
    console.log('My Company');
  }
}

class Drone extends Vehicle {

}

class Car extends Vehicle {
  constructor(licenseNum) {
    super(licenseNum); // #
    this.gpsEnabled = false;
  }

  start() { // ##
    super.start();
    console.log('starting Car');
  }

  static getCompanyName() { // ###
    super.getCompanyName();
    console.log('My  Other Company');
  }
}

let c = new Car('A123');
// cosole.log(c instanceof Car) will be true, as will instanceof Vehicle or Object as its inherited from these

/* # - in js when creating new Car instance both Car and Vehicle constructors will get called, if Car is empty it works fine but if both need to be called need to call super() in the derived constructor(Car in this case) to make sure that Vehicles constructor gets called first. super() always needs to be called first in the constructor body */

// console.log(c.licenseNum) will log 'A123' as Car constructor passes the license number to Vehicle constructor

// console.log(c.gpsEnabled) will log false as Car constructor overrides it because its reassigned after super()

/* ## if start method is in Vehile only it will print 'starting Vehicle', if it exists in both without super() being called then the Car one will override it and only 'starting Car' will get logged. for methods super() can be called anywhere, if its at the start Vehicle one will execute first, if at the end then Car one will execute first */

/* ### static methods do get inherited by the extended class so if the getCompanyName() method exists on Vehicle only console.log(Car.getCompanyName()) will log 'My Company'. If it exists on both without calling super the Car one will override and 'My Other Company' gets logged. If super.getCompanyName() is called in Car then it will log both. c.getCompanyName() will still give an error as the instance does not inherit the static method */

/* best to store classes in separate files, can create a folder called classes and a separate js file for each class, use 'export class...' for exporting and 'import {Car} from '.car.js'' for importing, then instantiate the objects in app. Use PascalCase for naming classes and snake-case for file names */