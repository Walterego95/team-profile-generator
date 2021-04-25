const Employee = require('../lib/Employee.js');

test('creates an employee object', () => {
    const employee = new Employee(undefined);
  
    expect(employee.name).toBe(undefined);
    expect(employee.id).toBe(undefined);
    expect(employee.email).toBe(undefined);
  });
