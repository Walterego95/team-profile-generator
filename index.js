
const Employee = require('./lib/Employee.js');

let employee = new Employee("walter", "suca@walter.com");
console.log(employee.getName(), employee.getEmail(), employee.getRole(), employee.getId());


const Manager = require('./lib/Manager.js');

let manager = new Manager("big walt", "melasucano@walter.com");
console.log(manager.getName(), manager.getEmail(), manager.getRole(), manager.getId(), manager.getOfficeNumber());