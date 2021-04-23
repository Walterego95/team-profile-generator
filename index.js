
const Employee = require('./lib/Employee.js');

let employee = new Employee("walter", "suca@walter.com");
console.log(employee.getName(), employee.getEmail(), employee.getRole(), employee.getId());