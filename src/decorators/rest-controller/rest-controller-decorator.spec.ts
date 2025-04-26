import {expect} from 'chai';
import {restController} from './rest-controller-decorator.js';
import {RestControllerOptions} from './rest-controller-decorator.js';
import {RestControllerReflector} from './rest-controller-reflector.js';

describe('restController', function () {
  it('does not require options', function () {
    @restController()
    class Target {}
    const res = RestControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({className: 'Target'});
  });

  it('sets given options to the target metadata', function () {
    const options = {
      path: 'myPath',
      before: () => undefined,
      after: () => undefined,
      extraOption: 'extraOption',
    };
    @restController(options)
    class Target {}
    const res = RestControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({
      ...options,
      className: 'Target',
    });
  });

  it('overrides given "className" option by the target class name', function () {
    @restController({className: 'myClassName'} as RestControllerOptions)
    class Target {}
    const res = RestControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({className: 'Target'});
  });

  it('allows to pass the path option to the first parameter', function () {
    @restController('myPath')
    class Target {}
    const res = RestControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({className: 'Target', path: 'myPath'});
  });

  it('merges two given arguments in the target metadata', function () {
    const before = () => undefined;
    @restController('myPath', {before})
    class Target {}
    const res = RestControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({className: 'Target', path: 'myPath', before});
  });

  it('overrides the path option by the first argument', function () {
    @restController('myPath1', {path: 'myPath2'})
    class Target {}
    const res = RestControllerReflector.getMetadata(Target);
    expect(res).to.be.eql({className: 'Target', path: 'myPath1'});
  });
});
