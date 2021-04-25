const Manager = require('../lib/Manager.js');

test('creates a Manager object', () => {
    const manager = new Manager(undefined);

    expect(manager.name).toBe(undefined);
    expect(manager.id).toBe(undefined);
    expect(manager.email).toBe(undefined);
    expect(manager.officeNumber).toBe(undefined);
});