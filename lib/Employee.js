module.exports = class Employee {
  // class's properties
  name = null;
  email = null;
  id = null;

  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.id = this.generateId();
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return "Employee";
  }  
}
