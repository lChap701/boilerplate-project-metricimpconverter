/**
 * Constructor for conversions
 * @module ../controllers/convertHandler.js
 * 
 */
function ConvertHandler() {
  /**
   * Works like eval() but safer
   *
   * @param {String} data   Represents the data to be evaluated
   * @returns   Returns the result of an expression
   */
  function evaluate(data) {
    return Function('"use strict";return (' + data + ")")();
  }

  /**
   * Gets the initial number
   *
   * @tutorial See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
   * @param {String} input  Represents the number in the input field
   * @returns Returns the input as a number or 0
   */
  this.getNum = function (input) {
    let result = 0;

    if (input.includes("/")) {
      result = evaluate(num);
    } else if (typeof Number(input) === "number") {
      result = input;
    }

    return result;
  };

  /**
   * Gets the initial unit
   *
   * @param {String} input  Represents the unit in the input field
   * @returns   Returns the correct unit or "Unknown"
   */
  this.getUnit = function (input) {
    let result;

    switch (input.toLowerCase()) {
      case "l":
        result = input.toUpperCase();
        break;
      case "gal":
      case "lbs":
      case "kg":
      case "mi":
        result = input.toLowerCase();
        break;
      default:
        result = "Unknown";
    }

    return result;
  };

  /**
   * Displays the correct unit that should be returned
   *
   * @param {String} initUnit   Represents the unit that is being converted
   * @returns   Returns the correct unit or "Unknown"
   */
  this.getReturnUnit = function (initUnit) {
    let result;

    switch (initUnit.toLowerCase()) {
      case "l":
        result = "gal";
        break;
      case "gal":
        result = "L";
        break;
      case "lbs":
        result = "lbs";
        break;
      case "kg":
        result = "mi";
        break;
      case "mi":
        result = "kg";
        break;
      case "km":
        result = "mi";
        break;
      default:
        result = "Unknown";
    }

    return result;
  };

  /**
   * Displays the correct unit (in full)
   *
   * @param {String} unit   Represents the unit (shortened)
   * @returns   Returns the correct unit or "Unknown"
   */
  this.spellOutUnit = function (unit) {
    let result;

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
        result = "Unknown";
    }

    return result;
  };

  /**
   * Converts units
   *
   * @param {Number} initNum    The initial number
   * @param {String} initUnit   The initial units
   * @returns   Returns the units in kg, lbs, etc.
   */
  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
      case "l":
        result = initNum * galToL;
        break;
      case "gal":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        result = 0;
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
   * @returns   Returns a message
   */
  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result =
      initNum +
      " " +
      this.spellOutUnit(initUnit) +
      " converts to " +
      returnNum +
      " " +
      this.spellOutUnit(returnUnit);

    return result;
  };
}

module.exports = ConvertHandler;
