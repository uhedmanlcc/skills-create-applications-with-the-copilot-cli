#!/usr/bin/env node

// Supports the four basic calculator operations shown in the reference image:
// addition (+), subtraction (-), multiplication (* or x), and division (/).

function add(left, right) {
  return left + right;
}

function subtract(left, right) {
  return left - right;
}

function multiply(left, right) {
  return left * right;
}

function divide(left, right) {
  if (right === 0) {
    throw new Error('Cannot divide by zero.');
  }

  return left / right;
}

function calculate(left, operator, right) {
  switch (operator) {
    case '+':
      return add(left, right);
    case '-':
      return subtract(left, right);
    case '*':
    case 'x':
    case 'X':
      return multiply(left, right);
    case '/':
      return divide(left, right);
    default:
      throw new Error(`Unsupported operation "${operator}". Use +, -, *, or /.`);
  }
}

function parseNumber(value, name) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(`${name} must be a valid number.`);
  }

  return number;
}

function runCli(args) {
  if (args.length !== 3) {
    throw new Error('Usage: node src/calculator.js <number> <operator> <number>');
  }

  const left = parseNumber(args[0], 'The first operand');
  const right = parseNumber(args[2], 'The second operand');
  return calculate(left, args[1], right);
}

if (require.main === module) {
  try {
    console.log(runCli(process.argv.slice(2)));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  calculate,
  runCli,
};
