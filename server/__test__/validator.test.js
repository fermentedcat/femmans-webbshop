const { isNotWhiteSpace, isEmail } = require('../utils/validator');

describe('Checks if input is whitespace', () => {
  test('Returns true if not whitespace', () => {
    expect(isNotWhiteSpace('Not A Wite Space')).toBe(true);
  });

  test('Returns false if whitespace or empty string', () => {
    expect(isNotWhiteSpace('  ')).toBe(false);
  });
});

describe('Checks if input is valid Email', () => {
  test('Returns false if not valid email', () => {
    expect(isEmail('jfweirngerpebkmebkmepbjpbrmb')).toBe(false);
  });

  test('Returns true if valid email', () => {
    expect(isEmail('test@test.se')).toBe(true);
  });
});
