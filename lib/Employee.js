module.exports = class Employee {
  // parent class's properties
  name = null;
  email = null;
  id = null;

  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  generateId() {
    return this.id;
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
};
