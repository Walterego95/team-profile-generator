const Employee = require('./Employee.js');

module.exports = class Internal extends Employee {
    // class's properties
    school = null;
    id = null;

    constructor(name, id, email, school) {
        super(name, email);
        this.school = school;
        this.id = id;
    }

    generateId() {
        return this.id;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Internal";
    }
};