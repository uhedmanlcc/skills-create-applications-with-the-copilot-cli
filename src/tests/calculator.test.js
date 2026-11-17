const test = require('node:test');
const assert = require('node:assert/strict');

const {
  add,
  subtract,
  multiply,
  divide,
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

test('handles decimal and negative operands', () => {
  assert.equal(add(-2.5, 1.5), -1);
  assert.equal(subtract(-4, -6), 2);
  assert.equal(multiply(-3, 2.5), -7.5);
  assert.equal(divide(-9, 2), -4.5);
});

test('calculates each supported operator', () => {
  assert.equal(calculate(2, '+', 3), 5);
  assert.equal(calculate(10, '-', 4), 6);
  assert.equal(calculate(45, '*', 2), 90);
  assert.equal(calculate(20, '/', 5), 4);
  assert.equal(calculate(6, 'x', 7), 42);
  assert.equal(calculate(6, 'X', 7), 42);
});

test('rejects division by zero', () => {
  assert.throws(() => divide(1, 0), {
    message: 'Cannot divide by zero.',
  });
  assert.throws(() => calculate(1, '/', 0), {
    message: 'Cannot divide by zero.',
  });
});

test('rejects unsupported operators', () => {
  assert.throws(() => calculate(2, '%', 3), {
    message: 'Unsupported operation "%". Use +, -, *, or /.',
  });
});

test('runs CLI arguments for the example operations', () => {
  assert.equal(runCli(['2', '+', '3']), 5);
  assert.equal(runCli(['10', '-', '4']), 6);
  assert.equal(runCli(['45', '*', '2']), 90);
  assert.equal(runCli(['20', '/', '5']), 4);
});

test('rejects invalid CLI argument counts', () => {
  assert.throws(() => runCli([]), {
    message: 'Usage: node src/calculator.js <number> <operator> <number>',
  });
  assert.throws(() => runCli(['2', '+']), {
    message: 'Usage: node src/calculator.js <number> <operator> <number>',
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
