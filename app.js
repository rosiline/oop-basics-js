class Drone {
  constructor(id, name) {
    this._id = id;   //instance properies get added to instance
    this.name = name;
  }
  // _ used for private properties

  get id() { // getter function which allows this.id to get the id (otherwise it would be undefined since its private))
    return this._id;
  }

  set id(value) { // used to change the id for an instance to the new value
    this._id = value;
  }

  static getCompany() {
    console.log('in getCompany');
  }
  // static methods only exist on the class not the instance
  // cant use properties in static methods as 'this' is undefined since it gets defined when instance is created

  fly() {
    console.log('Drone ' + this.id + ' is flying');
  }
}
Drone.maxHeight = 2000; // static properties added to the class only, not the instance

// console.log(typeof Drone) will be function

let drone = new Drone('A123', 'Flyer');

// console.log(typeof drone) will be object
// console.log(drone instanceof Drone) is true
// console.log('drone: ' + drone.id + ' ' + drone.name(ordrone['name'])) will print 'drone: A123 Flyer'

let drone2 = new Drone('B456', 'Twirl');

// console.log(drone.id + ' ' + drone2.id) will print 'A123 B456'

// console.log(Drone.maxHeight) logs 2000
// console.log(drone.maxHeight) logs undefined as max height has only been added to the class not the instance
// console.log(Drone.getCompany()) logs 'in getCompany'
// console.log(drone.getCompany()) throws an error as the method only exists on the class not the instance

drone.fly() //will console log 'Drone A123 is flying'