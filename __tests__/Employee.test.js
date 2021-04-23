const Employee = require('../lib/Employee.js');

test('creates an employee object', () => {
    const Employee = new Employee('topaci');
  
    expect(Employee.name).toBe('topaci');
    expect(Employee.id).toEqual(expect.any(String));
    expect(Employee.email).toEqual(expect.any(String));
  });

  test('gets employee id value', () => {
    const employee = new Employee('topaci');
  
    expect(employee.getId()).toEqual(expect.stringContaining(employee.id));
  });