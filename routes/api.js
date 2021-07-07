"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

/**
 * Handles all routing
 * @module ./routes/api
 *
 * @param {Express} app   Represents the current Express application
 *
 */
module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  /* My Code */
  // Displays the initial unit and the converted unit
  app.route("/api/convert").get((req, res) => {
    // Splits the input field
    const num = req.query.input.split(/[A-Za-z]/g)[0];
    const LENGTH = req.query.input.split(/[^A-Za-z]/g).length;
    const unit = req.query.input.split(/[^A-Za-z]/g)[LENGTH - 1];

    // Gets the initial values
    const initNum = convertHandler.getNum(num);
    const initUnit = convertHandler.getUnit(unit);

    // Gets the converted values
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    // Checks for invalid values
    if (returnNum == "invalid number and unit") {
      res.send(returnNum);
    } else {
      if (initNum == "invalid number") {
        res.send(initNum);
      } else if (initUnit == "invalid unit") {
        res.send(initUnit);
      } else {
        const obj = {
          initNum: initNum,
          initUnit: initUnit,
          returnNum: returnNum,
          returnUnit: returnUnit,
          string: convertHandler.getString(
            initNum,
            initUnit,
            returnNum,
            returnUnit
          ),
        };
        res.json(obj);
      }
    }
  });
};
