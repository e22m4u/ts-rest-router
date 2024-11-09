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
import {bodyParam} from './request-data-decorator.js';
import {requestData} from './request-data-decorator.js';
import {RequestDataSource} from './request-data-metadata.js';
import {RequestDataMetadata} from './request-data-metadata.js';
import {RequestDataReflector} from './request-data-reflector.js';

describe('requestData', function() {
  it('sets a given argument to the target metadata', function() {
    const md: RequestDataMetadata = {
      source: RequestDataSource.PARAMS,
      customOption: 'myOption',
    }
    class Target {
      myMethod(
        @requestData(md)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        prop: unknown,
      ) {}
    }
    const res = RequestDataReflector.getMetadata(Target, 'myMethod');
    expect(res.get(0)).to.be.eql(md);
  });

  describe('request data by a given source', function() {
    describe('params', function() {
      it('sets metadata with specified source and schema', function() {
        class Target {
          myMethod(
            @params()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    describe('queries', function() {
      it('sets metadata with specified source and schema', function() {
        class Target {
          myMethod(
            @queries()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    describe('headers', function() {
      it('sets metadata with specified source and schema', function() {
        class Target {
          myMethod(
            @headers()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    describe('cookies', function() {
      it('sets metadata with specified source and schema', function() {
        class Target {
          myMethod(
            @cookies()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    describe('body', function() {
      it('sets metadata with specified source and schema', function() {
        class Target {
          myMethod(
            @body()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.BODY,
          schema: {type: DataType.ANY},
        });
      });

      it('sets a given DataType to the target metadata', function() {
        class Target {
          myMethod(
            @body(DataType.STRING)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            prop: unknown,
          ) {}
        }
        const res = RequestDataReflector.getMetadata(Target, 'myMethod');
        expect(res.get(0)).to.be.eql({
          source: RequestDataSource.BODY,
          schema: {type: DataType.STRING},
        });
      });

      it('set a given DataSchema to the target metadata', function() {
        const schema = {type: DataType.STRING, required: true};
        class Target {
          myMethod(
            @body(schema)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  describe('request data piece by a given property key', function() {
    describe('param', function() {
      it('sets a given "propertyKey" to the target metadata', function() {
        class Target {
          myMethod(
            @param('myPropertyKey')
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      it('sets a given DataType as property type', function() {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @param(propertyKey, propertyType)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      it('sets a given DataSchema as property schema', function() {
        const schema = {
          type: DataType.STRING,
          required: true,
        };
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @param(propertyKey, schema)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    describe('query', function() {
      it('sets a given "propertyKey" to the target metadata', function() {
        class Target {
          myMethod(
            @query('myPropertyKey')
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      it('sets a given DataType as property type', function() {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @query(propertyKey, propertyType)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      it('sets a given DataSchema as property schema', function() {
        const schema = {
          type: DataType.STRING,
          required: true,
        };
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @query(propertyKey, schema)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    describe('header', function() {
      it('sets a given "propertyKey" to the target metadata', function() {
        class Target {
          myMethod(
            @header('myPropertyKey')
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      it('sets a given DataType as property type', function() {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @header(propertyKey, propertyType)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      it('sets a given DataSchema as property schema', function() {
        const schema = {
          type: DataType.STRING,
          required: true,
        };
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @header(propertyKey, schema)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    describe('cookie', function() {
      it('sets a given "propertyKey" to the target metadata', function() {
        class Target {
          myMethod(
            @cookie('myPropertyKey')
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      it('sets a given DataType as property type', function() {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @cookie(propertyKey, propertyType)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      it('sets a given DataSchema as property schema', function() {
        const schema = {
          type: DataType.STRING,
          required: true,
        };
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @cookie(propertyKey, schema)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    describe('bodyParam', function() {
      it('sets a given "propertyKey" to the target metadata', function() {
        class Target {
          myMethod(
            @bodyParam('myPropertyKey')
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      it('sets a given DataType as property type', function() {
        const propertyKey = 'myPropertyKey';
        const propertyType = DataType.STRING;
        class Target {
          myMethod(
            @bodyParam(propertyKey, propertyType)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      it('sets a given DataSchema as property schema', function() {
        const schema = {
          type: DataType.STRING,
          required: true,
        };
        const propertyKey = 'myPropertyKey';
        class Target {
          myMethod(
            @bodyParam(propertyKey, schema)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
