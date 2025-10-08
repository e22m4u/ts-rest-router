import {expect} from 'chai';
import {DebuggableService} from './debuggable-service.js';

describe('DebuggableService', function () {
  it('has the debug method', function () {
    const res = new DebuggableService();
    expect(typeof res.debug).to.be.eq('function');
  });
});
