const Employee = require('./Employee.js');

module.exports = class Engineer extends Employee {
    // class's properties
    github = null;
    id = null;

    constructor(name, id, email, github) {
        super(name, email);
        this.github = github;
        this.id = id;
    }

    generateId() {
        return this.id;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }
};