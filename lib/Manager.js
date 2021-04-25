const Employee = require('./Employee.js');

module.exports = class Manager extends Employee {
  // class's properties
  officeNumber = null;
  id = null;

  constructor(name, id, email, officeNumber) {
    super(name, email);
    this.officeNumber = officeNumber;
    this.id = id;
  };

  generateId() {
    return this.id;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return "Manager";
  }
};
