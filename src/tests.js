const test = require("tape");
const nock = require("nock");
const supertest = require("supertest");

const router = require("./router");
const { myRequest } = require("./api");

//testing tape test
test("Testing tape", t => {
  t.pass("Tape is working");
  t.end();
});

//SERVER ROUTES

//Home route - html
test("Home route should return status code 200", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Home route should return status code 200");
      t.end();
    });
});

//Public route - css
test("Public route should render css", t => {
  supertest(router)
    .get("/public/style.css")
    .expect(200)
    .expect("Content-type", /css/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Public route should render css");
      t.end();
    });
});

//Public route - javascript
test("Public route should render js", t => {
  supertest(router)
    .get("/public/index.js")
    .expect(200)
    .expect("Content-type", /javascript/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Public route should render js");
      t.end();
    });
});

//Public route - favicon
test("Public route should render favicon", t => {
  supertest(router)
    .get("/public/favicon.ico")
    .expect(200)
    .expect("Content-type", /x-ico/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Public route should render favicon");
      t.end();
    });
});

//Public route - error response text
test("Public route should return error", t => {
  supertest(router)
    .get("/public/missing")
    .expect(500)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 500, "Error on server side");
      t.equal(
        res.text,
        "<h1>500: Internal Server Error</h1>",
        "Public route should return error"
      );
      t.end();
    });
});

//Query route
test("Does client GET request return 200 status code", t => {
  supertest(router)
    .get("/query?=")
    .expect(200)
    .expect("Content-type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Request route should return 200");
      t.end();
    });
});

//404 ROUTE
test("Should return 404 Page Not Found", t => {
  supertest(router)
    .get("/fhkwefhe")
    .expect(404)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 404, "Should return 404 status code");
      t.equal(
        res.text,
        `<h1>404: Page Not Found</h1>`,
        "Should return 404 Page Not Found"
      );
      t.end();
    });
});

//myRequest MODULE TESTS - API requests handling by server
test("myRequest fetches data correctly", t => {
  nock("http://jsonplaceholder.typicode.com")
    .get("/users/1")
    .reply(200, {
      name: "Leanne Graham"
    });
  myRequest(
    "http://jsonplaceholder.typicode.com/users/1",
    (error, response) => {
      t.error(error);
      t.equal(
        response.statusCode,
        200,
        "the API should respond with a status code of 200"
      );
      t.deepEqual(
        response.body.name,
        "Leanne Graham",
        "the response body should contain the correct json"
      );
      t.end();
    }
  );
});

test("myRequest fetches JSON", t => {
  nock("https://api.exchangeratesapi.io/")
    .get("/2010-01-12")
    .reply(200, {
      rates: {
        CAD: 1.4959,
        HKD: 11.2301,
        LVL: 0.7093,
        PHP: 66.106,
        DKK: 7.4405,
        HUF: 268.18,
        CZK: 26.258,
        AUD: 1.5668,
        RON: 4.1405,
        SEK: 10.2215,
        IDR: 13281.14,
        INR: 66.21,
        BRL: 2.5309,
        RUB: 42.6974,
        LTL: 3.4528,
        JPY: 132.41,
        THB: 47.839,
        CHF: 1.4743,
        SGD: 2.0133,
        PLN: 4.0838,
        BGN: 1.9558,
        TRY: 2.1084,
        CNY: 9.8863,
        NOK: 8.1825,
        NZD: 1.9573,
        ZAR: 10.8264,
        USD: 1.4481,
        MXN: 18.4995,
        EEK: 15.6466,
        GBP: 0.8972,
        KRW: 1627.4,
        MYR: 4.8424,
        HRK: 7.2753
      },
      base: "EUR",
      date: "2010-01-12"
    });
  myRequest("https://api.exchangeratesapi.io/2010-01-12", (error, response) => {
    t.error(error);
    t.equal(
      response.statusCode,
      200,
      "the API should respond with a status code of 200"
    );
    t.deepEqual(
      response.body.base,
      "EUR",
      "the response body.base should return EUR"
    );
    t.end();
  });
});
