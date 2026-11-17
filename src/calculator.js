#!/usr/bin/env node

// Supports addition (+), subtraction (-), multiplication (* or x), division (/),
// modulo (%), exponentiation (^), and square root (sqrt).

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

function modulo(left, right) {
  if (right === 0) {
    throw new Error('Cannot take modulo by zero.');
  }

  return left % right;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(number) {
  if (number < 0) {
    throw new Error('Cannot calculate the square root of a negative number.');
  }

  return Math.sqrt(number);
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
    case '%':
      return modulo(left, right);
    case '^':
    case '**':
      return power(left, right);
    case 'sqrt':
    case '√':
      return squareRoot(left);
    default:
      throw new Error(
        `Unsupported operation "${operator}". Use +, -, *, /, %, ^, or sqrt.`,
      );
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
  if (args.length === 2 && (args[1] === 'sqrt' || args[1] === '√')) {
    return calculate(parseNumber(args[0], 'The operand'), args[1]);
  }

  if (args.length !== 3) {
    throw new Error(
      'Usage: node src/calculator.js <number> <operator> <number> or node src/calculator.js <number> sqrt',
    );
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
  modulo,
  power,
  squareRoot,
  calculate,
  runCli,
};
