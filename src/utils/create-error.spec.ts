import {expect} from 'chai';
import {createError} from './create-error.js';

describe('createError', function () {
  it('interpolates the given message with arguments', function () {
    const res = createError(Error, 'My %s', 'message');
    expect(res.message).to.be.eq('My message');
  });
});
