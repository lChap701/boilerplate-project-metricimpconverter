const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  /* My Tests */
  suite("Input Tests", () => {
    // Number input tests
    test("1)  Whole Number Test", function () {
      const val = convertHandler.getNum("12");
      assert.equal(val, 12, `'${val}' is not equal to '12'`);
    });

    test("2)  Decimal Test", function () {
      const val = convertHandler.getNum("9.876");
      assert.equal(val, 9.876, `'${val}' is not equal to '9.876'`);
    });

    test("3)  Fractional Test", function () {
      const val = convertHandler.getNum("1/2");
      assert.equal(val, 0.5, `'${val}' is not equal to '0.5'`);
    });

    test("4)  Fractional With Decimals Test", function () {
      const val = convertHandler.getNum("1.1/2");
      assert.equal(val, 0.55, `'${val}' is not equal to '0.55'`);
    });

    test("5)  Invalid Fractional Test", () => {
      const val = convertHandler.getNum("1/2/3");
      assert.equal(
        val,
        "invalid number",
        `'${val}' is not equal to 'invalid number'`
      );
    });

    test("6)  Default Test", () => {
      const val = convertHandler.getNum("");
      assert.equal(val, 1, `'${val}' is not equal to '1'`);
    });

    // Unit input tests
    test("7)  Unit of Measurement Test", () => {
      const units = ["GAL", "l", "Mi", "Km", "LbS", "KG"];

      // Tests each unit in the array
      units.forEach((unit) => {
        const val = convertHandler.getUnit(unit);
        const compare =
          unit.toLowerCase() == "l" ? unit.toUpperCase() : unit.toLowerCase();
        assert.equal(
          val,
          compare,
          `'${unit}' becomes '${val}' not '${compare}'`
        );
      });
    });

    test("8)  Invalid Unit of Measurement Test", () => {
      const val = convertHandler.getUnit("gha1");
      assert.equal(
        val,
        "invalid unit",
        `'${val}' is not equal to 'invalid unit'`
      );
    });
  });

  suite("Conversion Tests", () => {
    test("1)  Unit Conversion Test", () => {
      const units = [
        { init: "gal", converted: "L" },
        { init: "L", converted: "gal" },
        { init: "mi", converted: "km" },
        { init: "km", converted: "mi" },
        { init: "lbs", converted: "kg" },
        { init: "kg", converted: "lbs" },
      ];

      // Tests each unit in the array
      units.forEach((unit) => {
        const val = convertHandler.getReturnUnit(unit.init);
        assert.equal(
          val,
          unit.converted,
          `'${unit.init}' converts to '${val}' not '${unit.converted}'`
        );
      });
    });

    test("2)  Gallons Conversion Test", function () {
      const val = convertHandler.convert(1, "gal");
      assert.equal(
        val,
        3.78541,
        `'1 gal' converts to '${val} L' not ' 3.78541 L'`
      );
    });

    test("3)  Liters Conversion Test", function () {
      const val = convertHandler.convert(3.78541, "L");
      assert.equal(val, 1, `'3.78541 L' converts to '${val} gal' not '1 gal'`);
    });

    test("4)  Miles Conversion Test", function () {
      const val = convertHandler.convert(1, "mi");
      assert.equal(val, 1.60934, `'1 mi' converts to '${val} km' not '1.60934 km'`);
    });

    test("5)  Kilometers Conversion Test", function () {
      const val = convertHandler.convert(1.60934, "km");
      assert.equal(val, 1, `'1.60934 km' converts to '${val} mi' not '1 mi'`);
    });

    test("6)  Pounds Conversion Test", function () {
      const val = convertHandler.convert(1, "lbs");
      assert.equal(
        val,
        0.45359,
        `'1 lbs' converts to '${val} kg' not '0.45359 kg'`
      );
    });

    test("7)  Kilograms Conversion Test", function () {
      const val = convertHandler.convert(0.453592, "kg");
      assert.equal(
        val,
        1,
        `'0.453592 kg' converts to '${val} lbs' not '1 lbs'`
      );
    });

    suite("Input & Conversion Tests", function () {
      test("1)  Full Unit of Measurement Tests", function () {
        const units = [
          { short: "gal", full: "gallons" },
          { short: "L", full: "liters" },
          { short: "mi", full: "miles" },
          { short: "km", full: "kilometers" },
          { short: "lbs", full: "pounds" },
          { short: "kg", full: "kilograms" },
        ];

        // Tests each unit in the array
        units.forEach((unit) => {
          const val = convertHandler.spellOutUnit(unit.short);
          assert.equal(
            val,
            unit.full,
            `'${unit.short}' becomes '${val}' not '${unit.full}'`
          );
        });
      });
    });
  });
});
