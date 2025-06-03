/* eslint-disable @typescript-eslint/no-unused-vars */
import {expect} from 'chai';
import {DataType} from '@e22m4u/ts-data-schema';
import {requestData} from './request-data-decorator.js';
import {requestBody} from './request-data-decorator.js';
import {requestField} from './request-data-decorator.js';
import {requestParam} from './request-data-decorator.js';
import {requestQuery} from './request-data-decorator.js';
import {requestCookie} from './request-data-decorator.js';
import {requestHeader} from './request-data-decorator.js';
import {requestParams} from './request-data-decorator.js';
import {requestQueries} from './request-data-decorator.js';
import {requestHeaders} from './request-data-decorator.js';
import {requestCookies} from './request-data-decorator.js';
import {RequestDataSource} from './request-data-metadata.js';
import {RequestDataReflector} from './request-data-reflector.js';

describe('requestData', function () {
  it('has aliases', function () {
    expect(requestParams).to.be.instanceOf(Function);
    expect(requestParam).to.be.instanceOf(Function);
    expect(requestQueries).to.be.instanceOf(Function);
    expect(requestQuery).to.be.instanceOf(Function);
    expect(requestHeaders).to.be.instanceOf(Function);
    expect(requestHeader).to.be.instanceOf(Function);
    expect(requestCookies).to.be.instanceOf(Function);
    expect(requestCookie).to.be.instanceOf(Function);
    expect(requestField).to.be.instanceOf(Function);
    expect(requestBody).to.be.instanceOf(Function);
  });

  it('sets given options to the target metadata', function () {
    const options = {
      source: RequestDataSource.BODY,
      schema: {type: DataType.STRING},
      property: 'prop',
      customOption: 'myOption',
    };
    class Target {
      myMethod(
        @requestData(options)
        prop: unknown,
      ) {}
    }
    const res = RequestDataReflector.getMetadata(Target, 'myMethod');
    expect(res.get(0)).to.be.eql(options);
  });

  describe('request data by a given source', function () {
    describe('params', function () {
      it('sets metadata with specified source and schema', function () {
        class Target {
          myMethod(
            @requestParams()
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.PARAMS,
          schema: {type: DataType.ANY},
        });
      });
    });

    describe('queries', function () {
      it('sets metadata with specified source and schema', function () {
        class Target {
          myMethod(
            @requestQueries()
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.QUERY,
          schema: {type: DataType.ANY},
        });
      });
    });

    describe('headers', function () {
      it('sets metadata with specified source and schema', function () {
        class Target {
          myMethod(
            @requestHeaders()
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.HEADERS,
          schema: {type: DataType.ANY},
        });
      });
    });

    describe('cookies', function () {
      it('sets metadata with specified source and schema', function () {
        class Target {
          myMethod(
            @requestCookies()
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.COOKIE,
          schema: {type: DataType.ANY},
        });
      });
    });

    describe('body', function () {
      it('sets metadata with specified source and schema', function () {
        class Target {
          myMethod(
            @requestBody()
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.BODY,
          schema: {type: DataType.ANY},
        });
      });

      it('sets a given DataType to the target metadata', function () {
        class Target {
          myMethod(
            @requestBody(DataType.STRING)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.BODY,
          schema: {type: DataType.STRING},
        });
      });

      it('set a given DataSchema to the target metadata', function () {
        const schema = {type: DataType.STRING, required: true};
        class Target {
          myMethod(
            @requestBody(schema)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.BODY,
          schema,
        });
      });
    });
  });

  describe('request data piece by a given property key', function () {
    describe('param', function () {
      it('sets a given "propertyKey" to the target metadata', function () {
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @requestParam(propertyKey)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.PARAMS,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: {
                type: DataType.ANY,
              },
            },
          },
          property: propertyKey,
        });
      });

      it('sets a given DataType as property type', function () {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @requestParam(propertyKey, propertyType)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.PARAMS,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: {
                type: propertyType,
              },
            },
          },
          property: propertyKey,
        });
      });

      it('sets a given DataSchema as property schema', function () {
        const schema = {
          type: DataType.STRING,
          required: true,
        };
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @requestParam(propertyKey, schema)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.PARAMS,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: schema,
            },
          },
          property: propertyKey,
        });
      });
    });

    describe('query', function () {
      it('sets a given "propertyKey" to the target metadata', function () {
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @requestQuery(propertyKey)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.QUERY,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: {
                type: DataType.ANY,
              },
            },
          },
          property: propertyKey,
        });
      });

      it('sets a given DataType as property type', function () {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @requestQuery(propertyKey, propertyType)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.QUERY,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: {
                type: propertyType,
              },
            },
          },
          property: propertyKey,
        });
      });

      it('sets a given DataSchema as property schema', function () {
        const schema = {
          type: DataType.STRING,
          required: true,
        };
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @requestQuery(propertyKey, schema)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.QUERY,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: schema,
            },
          },
          property: propertyKey,
        });
      });
    });

    describe('header', function () {
      it('sets a given "propertyKey" to the target metadata', function () {
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @requestHeader(propertyKey)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.HEADERS,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: {
                type: DataType.ANY,
              },
            },
          },
          property: propertyKey,
        });
      });

      it('sets a given DataType as property type', function () {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @requestHeader(propertyKey, propertyType)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.HEADERS,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: {
                type: propertyType,
              },
            },
          },
          property: propertyKey,
        });
      });

      it('sets a given DataSchema as property schema', function () {
        const schema = {
          type: DataType.STRING,
          required: true,
        };
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @requestHeader(propertyKey, schema)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.HEADERS,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: schema,
            },
          },
          property: propertyKey,
        });
      });
    });

    describe('cookie', function () {
      it('sets a given "propertyKey" to the target metadata', function () {
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @requestCookie(propertyKey)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.COOKIE,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: {
                type: DataType.ANY,
              },
            },
          },
          property: propertyKey,
        });
      });

      it('sets a given DataType as property type', function () {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @requestCookie(propertyKey, propertyType)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.COOKIE,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: {
                type: propertyType,
              },
            },
          },
          property: propertyKey,
        });
      });

      it('sets a given DataSchema as property schema', function () {
        const schema = {
          type: DataType.STRING,
          required: true,
        };
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @requestCookie(propertyKey, schema)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.COOKIE,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: schema,
            },
          },
          property: propertyKey,
        });
      });
    });

    describe('field', function () {
      it('sets a given "propertyKey" to the target metadata', function () {
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @requestField(propertyKey)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.BODY,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: {
                type: DataType.ANY,
              },
            },
          },
          property: propertyKey,
        });
      });

      it('sets a given DataType as property type', function () {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @requestField(propertyKey, propertyType)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.BODY,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: {
                type: propertyType,
              },
            },
          },
          property: propertyKey,
        });
      });

      it('sets a given DataSchema as property schema', function () {
        const schema = {
          type: DataType.STRING,
          required: true,
        };
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @requestField(propertyKey, schema)
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.BODY,
          schema: {
            type: DataType.OBJECT,
            properties: {
              [propertyKey]: schema,
            },
          },
          property: propertyKey,
        });
      });
    });
  });
});
