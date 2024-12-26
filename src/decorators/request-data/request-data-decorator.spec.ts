/* eslint-disable @typescript-eslint/no-unused-vars */
import {expect} from 'chai';
import {DataType} from '@e22m4u/ts-data-schema';
import {body} from './request-data-decorator.js';
import {param} from './request-data-decorator.js';
import {query} from './request-data-decorator.js';
import {cookie} from './request-data-decorator.js';
import {header} from './request-data-decorator.js';
import {params} from './request-data-decorator.js';
import {queries} from './request-data-decorator.js';
import {cookies} from './request-data-decorator.js';
import {headers} from './request-data-decorator.js';
import {bodyProp} from './request-data-decorator.js';
import {requestData} from './request-data-decorator.js';
import {RequestDataSource} from './request-data-metadata.js';
import {RequestDataReflector} from './request-data-reflector.js';

describe('requestData', function () {
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
            @params()
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.PARAMS,
          schema: {type: DataType.OBJECT},
        });
      });
    });

    describe('queries', function () {
      it('sets metadata with specified source and schema', function () {
        class Target {
          myMethod(
            @queries()
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.QUERY,
          schema: {type: DataType.OBJECT},
        });
      });
    });

    describe('headers', function () {
      it('sets metadata with specified source and schema', function () {
        class Target {
          myMethod(
            @headers()
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.HEADERS,
          schema: {type: DataType.OBJECT},
        });
      });
    });

    describe('cookies', function () {
      it('sets metadata with specified source and schema', function () {
        class Target {
          myMethod(
            @cookies()
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.COOKIE,
          schema: {type: DataType.OBJECT},
        });
      });
    });

    describe('body', function () {
      it('sets metadata with specified source and schema', function () {
        class Target {
          myMethod(
            @body()
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
            @body(DataType.STRING)
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
            @body(schema)
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
        class Target {
          myMethod(
            @param('myPropertyKey')
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.PARAMS,
          schema: {type: DataType.OBJECT},
          property: 'myPropertyKey',
        });
      });

      it('sets a given DataType as property type', function () {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @param(propertyKey, propertyType)
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
            @param(propertyKey, schema)
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
        class Target {
          myMethod(
            @query('myPropertyKey')
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.QUERY,
          schema: {type: DataType.OBJECT},
          property: 'myPropertyKey',
        });
      });

      it('sets a given DataType as property type', function () {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @query(propertyKey, propertyType)
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
            @query(propertyKey, schema)
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
        class Target {
          myMethod(
            @header('myPropertyKey')
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.HEADERS,
          schema: {type: DataType.OBJECT},
          property: 'myPropertyKey',
        });
      });

      it('sets a given DataType as property type', function () {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @header(propertyKey, propertyType)
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
            @header(propertyKey, schema)
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
        class Target {
          myMethod(
            @cookie('myPropertyKey')
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.COOKIE,
          schema: {type: DataType.OBJECT},
          property: 'myPropertyKey',
        });
      });

      it('sets a given DataType as property type', function () {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @cookie(propertyKey, propertyType)
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
            @cookie(propertyKey, schema)
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

    describe('bodyProp', function () {
      it('sets a given "propertyKey" to the target metadata', function () {
        class Target {
          myMethod(
            @bodyProp('myPropertyKey')
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.BODY,
          schema: {type: DataType.OBJECT},
          property: 'myPropertyKey',
        });
      });

      it('sets a given DataType as property type', function () {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @bodyProp(propertyKey, propertyType)
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
            @bodyProp(propertyKey, schema)
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
