const test = require('node:test');
const assert = require('node:assert/strict');

const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
  runCli,
} = require('../calculator');

test('adds the example operands', () => {
  assert.equal(add(2, 3), 5);
});

test('subtracts the example operands', () => {
  assert.equal(subtract(10, 4), 6);
});

test('multiplies the example operands', () => {
  assert.equal(multiply(45, 2), 90);
});

test('divides the example operands', () => {
  assert.equal(divide(20, 5), 4);
});

test('calculates modulo, power, and square root', () => {
  assert.equal(modulo(10, 3), 1);
  assert.equal(power(2, 4), 16);
  assert.equal(squareRoot(81), 9);
});

test('matches the extended operations examples', () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(power(2, 3), 8);
  assert.equal(squareRoot(16), 4);
});

test('handles decimal and negative operands', () => {
  assert.equal(add(-2.5, 1.5), -1);
  assert.equal(subtract(-4, -6), 2);
  assert.equal(multiply(-3, 2.5), -7.5);
  assert.equal(divide(-9, 2), -4.5);
  assert.equal(modulo(-7, 3), -1);
  assert.equal(power(4, -1), 0.25);
});

test('calculates each supported operator', () => {
  assert.equal(calculate(2, '+', 3), 5);
  assert.equal(calculate(10, '-', 4), 6);
  assert.equal(calculate(45, '*', 2), 90);
  assert.equal(calculate(20, '/', 5), 4);
  assert.equal(calculate(6, 'x', 7), 42);
  assert.equal(calculate(6, 'X', 7), 42);
  assert.equal(calculate(10, '%', 3), 1);
  assert.equal(calculate(2, '^', 4), 16);
  assert.equal(calculate(2, '**', 4), 16);
  assert.equal(calculate(81, 'sqrt'), 9);
  assert.equal(calculate(81, '√'), 9);
});

test('rejects division by zero', () => {
  assert.throws(() => divide(1, 0), {
    message: 'Cannot divide by zero.',
  });
  assert.throws(() => calculate(1, '/', 0), {
    message: 'Cannot divide by zero.',
  });
});

test('rejects modulo by zero and square roots of negative numbers', () => {
  assert.throws(() => modulo(1, 0), {
    message: 'Cannot take modulo by zero.',
  });
  assert.throws(() => calculate(1, '%', 0), {
    message: 'Cannot take modulo by zero.',
  });
  assert.throws(() => squareRoot(-1), {
    message: 'Cannot calculate the square root of a negative number.',
  });
  assert.throws(() => calculate(-1, 'sqrt'), {
    message: 'Cannot calculate the square root of a negative number.',
  });
});

test('rejects unsupported operators', () => {
  assert.throws(() => calculate(2, '&', 3), {
    message: 'Unsupported operation "&". Use +, -, *, /, %, ^, or sqrt.',
  });
});

test('runs CLI arguments for the example operations', () => {
  assert.equal(runCli(['2', '+', '3']), 5);
  assert.equal(runCli(['10', '-', '4']), 6);
  assert.equal(runCli(['45', '*', '2']), 90);
  assert.equal(runCli(['20', '/', '5']), 4);
  assert.equal(runCli(['10', '%', '3']), 1);
  assert.equal(runCli(['2', '^', '4']), 16);
  assert.equal(runCli(['81', 'sqrt']), 9);
});

test('rejects invalid CLI argument counts', () => {
  assert.throws(() => runCli([]), {
    message:
      'Usage: node src/calculator.js <number> <operator> <number> or node src/calculator.js <number> sqrt',
  });
  assert.throws(() => runCli(['2', '+']), {
    message:
      'Usage: node src/calculator.js <number> <operator> <number> or node src/calculator.js <number> sqrt',
  });
});

test('rejects non-numeric CLI operands', () => {
  assert.throws(() => runCli(['two', '+', '3']), {
    message: 'The first operand must be a valid number.',
  });
  assert.throws(() => runCli(['2', '+', 'three']), {
    message: 'The second operand must be a valid number.',
  });
});
