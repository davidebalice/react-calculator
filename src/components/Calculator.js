import React, { useState } from "react";
import { HiMiniBackspace } from "react-icons/hi2";
import classes from "./Calculator.module.css";
import { TiDivide, TiPlus, TiMinus, TiTimes, TiEquals } from "react-icons/ti";

function Calculator() {
  const [calculation, setCalculation] = useState("");
  const [output, setOutput] = useState("");
  const actions = ["/", "*", "+", "-", "."];

  const updateCalculation = (value) => {
    if (
      actions.includes(value) & (calculation === "") ||
      actions.includes(value) & actions.includes(calculation.slice(-1))
    ) {
      return;
    }
    setCalculation(calculation + value);

    if (!actions.includes(value)) {
      setOutput(eval(calculation + value).toString());
    }
  };
  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button
          className={classes.numbers}
          onClick={() => updateCalculation(i.toString())}
          key={i}
        >
          {i}
        </button>
      );
    }
    return digits;
  };
  const calculate = () => {
    setCalculation(eval(calculation).toString());
  };
  const clear = () => {
    if (calculation === "") {
      return;
    }
    const value = calculation.slice(0, -1);
    setCalculation(value);
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className={classes.calculatorContainer}>
            <h2 className={classes.calculatorTitle}>React Calculator</h2>

            <div className="calc-grid">
              <div className={classes.outputBar}>
                {calculation || "0"}
                {output ? <span className={classes.preRes}>{output}</span> : ""}
              </div>

              <div>
                <div className={classes.operationsContainer}>
                  <button
                    className={classes.button_calc}
                    key="/"
                    onClick={() => {
                      updateCalculation("/");
                    }}
                  >
                    <TiDivide />
                  </button>
                  <button
                    className={classes.button_calc}
                    key="*"
                    onClick={() => {
                      updateCalculation("*");
                    }}
                  >
                    <TiTimes />
                  </button>
                  <button
                    className={classes.button_calc}
                    key="+"
                    onClick={() => {
                      updateCalculation("+");
                    }}
                  >
                    <TiPlus />
                  </button>
                  <button
                    className={classes.button_calc}
                    key="-"
                    onClick={() => {
                      updateCalculation("-");
                    }}
                  >
                    <TiMinus />
                  </button>
                  <button
                    className={classes.button_calc+' '+classes.button_canc}
                    key="c"
                    onClick={clear}
                  >
                    {" "}
                    <HiMiniBackspace />
                  </button>
                </div>

                <div className={classes.numbersContainer}>
                  {createDigits()}

                  <button
                    className={classes.numbers}
                    onClick={() => {
                      updateCalculation(".");
                    }}
                  >
                    .
                  </button>
                  <button
                    className={classes.numbers}
                    onClick={() => {
                      updateCalculation("0");
                    }}
                  >
                    0
                  </button>
                  <button className={classes.numbers+' '+classes.equal} onClick={calculate}>
                    <TiEquals />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calculator;
