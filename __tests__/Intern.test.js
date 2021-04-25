const Internal = require('../lib/Internal.js');

test('creates an intern object', () => {
    const internal = new Internal(undefined);
  
    expect(internal.name).toBe(undefined);
    expect(internal.id).toBe(undefined);
    expect(internal.email).toBe(undefined);
    expect(internal.school).toBe(undefined);
  });