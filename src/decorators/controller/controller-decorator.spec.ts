import {expect} from 'chai';
import {controller} from './controller-decorator.js';
import {ControllerReflector} from './controller-reflector.js';

describe('controller', function () {
  it('does not requires options', function () {
    @controller()
    class Target {}
    const res = ControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({className: 'Target'});
  });

  it('sets given options to the target metadata', function () {
    const path = 'myPath';
    const before = () => undefined;
    const after = () => undefined;
    const extraOption = 'extraOption';
    @controller({
      path,
      before,
      after,
      extraOption,
    })
    class Target {}
    const res = ControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({
      className: 'Target',
      path,
      before,
      after,
      extraOption,
    });
  });

  it('overrides given "className" option by the target class name', function () {
    @controller({className: 'myClassName'})
    class Target {}
    const res = ControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({className: 'Target'});
  });
});
