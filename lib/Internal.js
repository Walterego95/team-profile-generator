const Employee = require('./Employee.js');

module.exports = class Internal extends Employee {
    // class's properties
    school = null;
  
    constructor(name, email, school) {
      super(name, email);
      this.school = school;
      this.id = this.generateId();
    }
  
    generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  
    getSchool() {
      return this.school;
    }
  
    getRole() {
      return "Internal";
    }  
  }