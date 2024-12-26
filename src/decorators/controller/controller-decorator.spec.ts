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

  it('allows to pass the path option to the first parameter', function () {
    @controller('myPath')
    class Target {}
    const res = ControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({className: 'Target', path: 'myPath'});
  });

  it('merges two given arguments in the target metadata', function () {
    const before = () => undefined;
    @controller('myPath', {before})
    class Target {}
    const res = ControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({className: 'Target', path: 'myPath', before});
  });

  it('overrides the path option by the first argument', function () {
    @controller('myPath1', {path: 'myPath2'})
    class Target {}
    const res = ControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({className: 'Target', path: 'myPath1'});
  });
});
