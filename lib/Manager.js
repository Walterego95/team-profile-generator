const Employee = require('./Employee.js');

module.exports = class Manager extends Employee {
    // class's properties
    officeNumber = null;
  
    constructor(name, email, officeNumber) {
      super(name, email);
      this.officeNumber = officeNumber;
      this.id = this.generateId();
    }
  
    generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  
    getOfficeNumber() {
      return this.officeNumber;
    }
  
    getRole() {
      return "Manager";
    }  
  }
  