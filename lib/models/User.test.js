const User = require('./User');

describe('User model', () => {
  it('has a required email', () => {
    const user = new User({
      password: expect.any(String)
    });

    const { errors } = user.validateSync();
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

  it('has a required password', () => {
    const user = new User({
      email: 'test@testing.com'
    });
      
    const { errors } = user.validateSync();
    expect(errors.passwordHash.message).toEqual('Path `passwordHash` is required.');
  });
});
