import { expect } from 'chai';
import { capitalize } from './capitalize.js';
describe('capitalize', function () {
    it('makes the first letter to upper case', function () {
        expect(capitalize('foo')).to.be.eq('Foo');
        expect(capitalize('foo bar')).to.be.eq('Foo bar');
    });
});
