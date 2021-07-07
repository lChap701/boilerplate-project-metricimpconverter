"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

/**
 * Handles all routing
 * @module ./routes/api
 *
 * @param {Express} app   Represents the current Express application
 */
module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  // Displays the initial unit and the converted unit
  app.route("/api/convert").get((req, res) => {
    const num = req.query.input.split(/[A-Za-z]/)[0];
    const unit = req.query.input.split(/[^A-Za-z]/)[0];

    const initNum = convertHandler.getNum(num);
    const initUnit = convertHandler.getUnit(unit);

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    app.emit("submit", {
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
    });
  });
};
