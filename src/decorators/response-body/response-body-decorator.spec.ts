import {expect} from 'chai';
import {DataType} from '@e22m4u/ts-data-schema';
import {responseBody} from './response-body-decorator.js';
import {ResponseBodyReflector} from './response-body-reflector.js';

describe('responseBody', function () {
  it('does not require arguments', function () {
    class Target {
      @responseBody()
      myMethod() {}
    }
    const res = ResponseBodyReflector.getMetadata(Target);
    expect(res.get('myMethod')).to.be.eql({});
  });

  it('sets the given DataType to the target metadata', function () {
    class Target {
      @responseBody(DataType.STRING)
      myMethod() {}
    }
    const res = ResponseBodyReflector.getMetadata(Target);
    expect(res.get('myMethod')).to.be.eql({schema: {type: DataType.STRING}});
  });

  it('sets the given schema to the target metadata', function () {
    const schema = {
      type: DataType.OBJECT,
      properties: {
        foo: {type: DataType.STRING},
        bar: {type: DataType.NUMBER},
      },
    };
    class Target {
      @responseBody(schema)
      myMethod() {}
    }
    const res = ResponseBodyReflector.getMetadata(Target);
    expect(res.get('myMethod')).to.be.eql({schema});
  });
});
