// Safe evaluator for simple arithmetic expressions (+ - * / and decimals),
// used instead of eval(). Returns null when the expression is not valid.
const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

const apply = (a, b, op) => {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    default:
      return a / b;
  }
};

export default function evaluate(expression) {
  const tokens = expression.match(/\d+\.\d*|\.\d+|\d+|[+\-*/]/g);
  if (!tokens || tokens.join("") !== expression) {
    return null;
  }

  const values = [];
  const operators = [];

  const reduce = () => {
    const b = values.pop();
    const a = values.pop();
    if (a === undefined || b === undefined) {
      throw new Error("Invalid expression");
    }
    values.push(apply(a, b, operators.pop()));
  };

  try {
    for (const token of tokens) {
      if (token in precedence) {
        while (
          operators.length &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          reduce();
        }
        operators.push(token);
      } else {
        values.push(parseFloat(token));
      }
    }
    while (operators.length) {
      reduce();
    }
  } catch {
    return null;
  }

  const result = values[0];
  return values.length === 1 && Number.isFinite(result)
    ? String(parseFloat(result.toPrecision(12)))
    : null;
}
