const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  /* My tests */
  const PATH = "/api/convert";

  suite("GET /api/convert Tests", () => {
    test("1)  Conversion Test", () => {
      chai
        .request(server)
        .get(PATH + "?input=10lbs")
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            const obj = {
              initNum: 10,
              initUnit: "lbs",
              returnNum: 4.53592,
              returnUnit: "kg",
              string: "10 pounds converts to 4.53592 kilograms",
            };

            assert.equal(
              res.text,
              JSON.stringify(obj),
              `'${JSON.stringify(obj)}' does not equal '${res.text}'`
            );
          }
        });
    });

    test("2)  Invalid Unit of Measurement Test", () => {
      chai
        .request(server)
        .get(PATH + "?input=10gb")
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            assert.equal(
              res.text,
              "invalid unit",
              `'invalid unit' does not equal '${res.text}'`
            );
          }
        });
    });

    test("3)  Invalid Number Test", () => {
      chai
        .request(server)
        .get(PATH + "?input=8.12.mi")
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            assert.equal(
              res.text,
              "invalid number",
              `'invalid number' does not equal '${res.text}'`
            );
          }
        });
    });

    test("4)  Invalid Number & Unit of Measurement Test", () => {
      chai
        .request(server)
        .get(PATH + "?input=8//12.1ml")
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            assert.equal(
              res.text,
              "invalid number and unit",
              `'invalid number and unit' does not equal '${res.text}'`
            );
          }
        });
    });

    test("5)  Default Number Test", () => {
      chai
        .request(server)
        .get(PATH + "?input=gal")
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            const obj = {
              initNum: 1,
              initUnit: "gal",
              returnNum: 3.78541,
              returnUnit: "L",
              string: "1 gallons converts to 3.78541 liters",
            };

            assert.equal(
              res.text,
              JSON.stringify(obj),
              `'${JSON.stringify(obj)}' does not equal '${res.text}'`
            );
          }
        });
    });
  });
});
