/**
 * Constructor for conversions
 * @module ../controllers/convertHandler.js
 *
 */
function ConvertHandler() {
  /* My code */

  /**
   * Works like eval() but safer
   * @tutorial See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
   *
   * @param {String} data   Represents the data to be evaluated
   * @returns   Returns the result of an expression
   */
  function evaluate(data) {
    return Function('"use strict";return (' + data + ")")();
  }

  /**
   * Gets the initial number (returns 1 by default)
   *
   * @param {String} input  Represents the number in the input field
   * @returns Returns the initial number, 1, or "invalid number"
   */
  this.getNum = function (input) {
    let result = 1;

    // Determines if a different value should be returned
    if (input.includes("/")) {
      result =
        input.match(/\//g).length == 1
          ? Number(evaluate(input))
          : "invalid number";
    } else if (typeof Number(input) === "number" && input !== "") {
      if (input > 0) {
        result = Number(input);
      } else {
        result = "invalid number";
      }
    } else if (input !== "") {
      result = "invalid number";
    }

    return result;
  };

  /**
   * Gets the initial unit
   *
   * @param {String} input  Represents the unit in the input field
   * @returns   Returns the correct unit or "invalid unit"
   */
  this.getUnit = function (input) {
    let result;

    // Determines what should be returned
    switch (input.toLowerCase()) {
      case "l":
        result = input.toUpperCase();
        break;
      case "gal":
      case "lbs":
      case "kg":
      case "mi":
      case "km":
        result = input.toLowerCase();
        break;
      default:
        result = "invalid unit";
    }

    return result;
  };

  /**
   * Displays the correct unit that should be returned
   *
   * @param {String} initUnit   Represents the unit that is being converted
   * @returns   Returns the correct unit or "invalid unit"
   */
  this.getReturnUnit = function (initUnit) {
    let result;

    // Determines what should be returned
    switch (initUnit.toLowerCase()) {
      case "l":
        result = "gal";
        break;
      case "gal":
        result = "L";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      default:
        result = "invalid unit";
    }

    return result;
  };

  /**
   * Displays the correct unit (in full)
   *
   * @param {String} unit   Represents the unit (shortened)
   * @returns   Returns the correct unit or "invalid unit"
   */
  this.spellOutUnit = function (unit) {
    let result;

    // Determines what should be returned
    switch (unit.toLowerCase()) {
      case "l":
        result = "liters";
        break;
      case "gal":
        result = "gallons";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "km":
        result = "kilometers";
        break;
      case "mi":
        result = "miles";
        break;
      default:
        result = "invalid unit";
    }

    return result;
  };

  /**
   * Converts units
   *
   * @param {Number} initNum    The initial number
   * @param {String} initUnit   The initial units
   * @returns   Returns the units in kg, lbs, etc., "invalid number", or "invalid number and unit"
   */
  this.convert = function (initNum, initUnit) {
    const GAL_TO_L = 3.78541;
    const lBS_TO_KG = 0.453592;
    const MI_TO_KM = 1.60934;
    let result;

    // Checks if both initial values are invalid
    if (initNum === "invalid number") {
      if (initUnit === "invalid unit") {
        result = "invalid number and unit";
      }
    } else {
      // Determines what should be returned
      switch (initUnit.toLowerCase()) {
        case "l":
          result = initNum / GAL_TO_L;
          break;
        case "gal":
          result = initNum * GAL_TO_L;
          break;
        case "lbs":
          result = initNum * lBS_TO_KG;
          break;
        case "kg":
          result = initNum / lBS_TO_KG;
          break;
        case "mi":
          result = initNum * MI_TO_KM;
          break;
        case "km":
          result = initNum / MI_TO_KM;
          break;
        default:
          result = "invalid number";
      }

      // Checks if the result is a valid number
      if (result !== "invalid number") {
        // Rounds the result by 5 decimal places
        result = Math.round(result * 100000) / 100000;
      }
    }

    return result;
  };

  /**
   * Displays a message contain the original value and converted value
   *
   * @param {Number} initNum      Represents the initial number
   * @param {String} initUnit     Represebts the initial unit
   * @param {Number} returnNum    Represents the number that was returned
   * @param {String} returnUnit   Represents the number that was returned
   * @returns   Returns a complete message or "Error"
   */
  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result =
      initNum !== "invalid number" && initUnit !== "invalid unit"
        ? `${initNum} ${this.spellOutUnit(
            initUnit
          )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
        : returnNum === "invalid number and unit"
        ? returnNum
        : initNum === "invalid number"
        ? initNum
        : initUnit;

    return result;
  };
}

module.exports = ConvertHandler;
