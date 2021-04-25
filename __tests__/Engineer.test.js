const Engineer = require('../lib/Engineer.js');

test('creates an engineer object', () => {
    const engineer = new Engineer(undefined);
  
    expect(engineer.name).toBe(undefined);
    expect(engineer.id).toBe(undefined);
    expect(engineer.email).toBe(undefined);
    expect(engineer.github).toBe(undefined);
  });