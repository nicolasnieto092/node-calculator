const { assert } = require('chai');
const { idText } = require('typescript');
let { termParser } = require('../services/terms/index');
const { DivisionByZeroError, BadInputError, UnbalancedParenthesisError } = require ('../services/terms/index');

describe('Test process Calculation', () => {
    it('Should support addition', () => {
        assert.equal(termParser('1+1'), 2);
        assert.equal(termParser('1+2+3+4+5'), 15);
    });
    it('Should support substraction', () => {
        assert.equal(termParser('2-2'), 0);
        assert.equal(termParser('100-99-1'), 0);
    });
    it('Should support multiplication', () => {
        assert.equal(termParser('111*111'), 12321);
        assert.equal(termParser('10*10*10'), 1000);
    });
    it('Should support division', () => {
        assert.equal(termParser('100/10'), 10);
        assert.equal(termParser('100/10/10'), 1);
    });
    it('Should support addition, substraction, multiplication and division altogether', () => {
        assert.equal(termParser('2000-500*1+1000/2'), 2000);
        assert.equal(termParser('1/2/3*4*5+6+7-8-9'), -0.67);
    });
    it('Should support floating point numbers', () => {
        assert.equal(termParser('2.5*2'), 5);
        assert.equal(termParser('10.10/2'), 5.05);
        assert.equal(termParser('3.33+3.33+3.33'), 9.99);
        assert.equal(termParser('1000-999.9'), 0.1);
        assert.equal(termParser('1.234567890123456789*1.234567890123456789'), 1.52);
    });
    it('Should support negative numbers', () => {
        assert.equal(termParser('-999+1000'), 1);
        assert.equal(termParser('1000-1001'), -1);
        assert.equal(termParser('-111-888'), -999);
    });
    it('Should support parentheses', () => {
        assert.equal(termParser('10*(5*(10+5))*(2*(10-8))'), 3000);
        assert.equal(termParser('100*(2+3)'), 500);
        assert.equal(termParser('2*(5+5)*3'), 60);
        assert.equal(termParser('10*(5*(2*10+5))'), 1250);
        assert.equal(termParser('(-1-2)*(-3-4)'), 21);
        assert.equal(termParser('(-1-2)/(-3-4)'), 0.43);
        assert.equal(termParser('(-1-2)+(-3-4)'), -10);
        assert.equal(termParser('(-1-2)-(-3-4)'), 4);
        assert.equal(termParser('(-1.1-2.2)+(-3.3-4.4)'), -11);
        assert.equal(termParser('(-1.1-2.2)-(-3.3-4.4)'), 4.4);
        assert.equal(termParser('(-1.1-2.2)*(-3.3-4.4)'), 25.41);
        assert.equal(termParser('(-1.1-2.2)/(-3.3-4.4)'), 0.43);
    });
    it('Should support spacing', () => {
        assert.equal(termParser('10   +    10/ 2'), 15);
        assert.equal(termParser('2*(      10+1 )'), 22);
    });
    it('Should handle unbalanced parenthesis', () => {
        assert.throws(() => termParser('10*(2+((1+2)'), UnbalancedParenthesisError, 'Unbalanced Parenthesis Error');
        assert.throws(() => termParser('50+(1+2)))'), UnbalancedParenthesisError, 'Unbalanced Parenthesis Error');
    });
    it('Should handle numbers without operators', () => {  // eval(1) => 1
        assert.equal(termParser('1'), 1);
        assert.equal(termParser('100'), 100);
    });
    it('Should handle errors', () => {
        assert.throws(() => termParser('0/0'), DivisionByZeroError, 'Division by zero error');
        assert.throws(() => termParser('1/0'), DivisionByZeroError, 'Division by zero error');
        assert.throws(() => termParser('10+!'), BadInputError, "Unexpected token '!'");
        assert.throws(() => termParser(''), BadInputError, "Invalid expression");
        assert.throws(() => termParser('2+*2'), BadInputError, "Unexpected token '*'");
        assert.throws(() => termParser('2-*2'), BadInputError, "Unexpected token '*'");
        assert.throws(() => termParser('2/*2'), BadInputError, "Unexpected token '*'");
        assert.throws(() => termParser('2+/2'), BadInputError, "Unexpected token '/'");
        assert.throws(() => termParser('2-/2'), BadInputError, "Unexpected token '/'");
        assert.throws(() => termParser('2*/2'), BadInputError, "Unexpected token '/'");
        assert.throws(() => termParser('1+++++++2'), BadInputError, "Unexpected token '+'");
        assert.throws(() => termParser('10+'), BadInputError, "Unexpected token '+'");
        assert.throws(() => termParser('10-'), BadInputError, "Unexpected token '-'");
        assert.throws(() => termParser('10/'), BadInputError, "Unexpected token '/'");
        assert.throws(() => termParser('10*'), BadInputError, "Unexpected token '*'");
        assert.throws(() => termParser('/4+1'), BadInputError, "Unexpected token '/'");
        assert.throws(() => termParser('*1+2'), BadInputError, "Unexpected token '*'");
    });

});