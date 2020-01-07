const Publisher = require('./Publisher');
const mongoose = require('mongoose');

describe('Publisher model', () => {
  it('has a required name', () => {
    const publisher = new Publisher();
    const { errors } = publisher.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has an address field', () => {
    const publisher = new Publisher({
      name: 'Random House',
      address: [
        { 
          city: 'New York', 
          state: 'New York', 
          country: 'USA' 
        }
      ]
    });

    expect(publisher.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Random House',
      address: [
        { 
          _id: expect.any(mongoose.Types.ObjectId), 
          city: 'New York', 
          state: 'New York', 
          country: 'USA' 
        }
      ],
      id: expect.any(String),
    });
  });
});
