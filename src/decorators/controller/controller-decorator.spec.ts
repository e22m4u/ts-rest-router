import {expect} from 'chai';
import {controller} from './controller-decorator.js';
import {ControllerOptions} from './controller-decorator.js';
import {ControllerReflector} from './controller-reflector.js';

describe('controller', function () {
  it('does not require options', function () {
    @controller()
    class Target {}
    const res = ControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({className: 'Target'});
  });

  it('sets given options to the target metadata', function () {
    const options = {
      path: 'myPath',
      before: () => undefined,
      after: () => undefined,
      extraOption: 'extraOption',
    };
    @controller(options)
    class Target {}
    const res = ControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({
      ...options,
      className: 'Target',
    });
  });

  it('overrides given "className" option by the target class name', function () {
    @controller({className: 'myClassName'} as ControllerOptions)
    class Target {}
    const res = ControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({className: 'Target'});
  });
});
