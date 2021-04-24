const Employee = require('./Employee.js');

module.exports = class Engineer extends Employee {
    // class's properties
    github = null;
  
    constructor(name, email, github) {
      super(name, email);
      this.github = github;
      this.id = this.generateId();
    }
  
    generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  
    getGithub() {
      return this.github;
    }
  
    getRole() {
      return "Engineer";
    }  
  }