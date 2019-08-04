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

//Public route - status code 500
test("Error on server side", t => {
  supertest(router)
    .get("/public/missing.js")
    .expect(500)
    .end((err, res) => {
      t.equal(res.statusCode, 500, "Error on server side");
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
    .get("/query")
    .expect(200)
    .expect("Content-type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Request route should return 200");
      t.end();
    });
});

//404 ROUTE
test("404 route", t => {
  supertest(router)
    .get("/fhkwefhe")
    .expect(404)
    .end((err, res) => {
      t.error(err);
      t.equal(
        res.text,
        `<h1>404: Page Not Found</h1>`,
        "Should return 404 page not found"
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
    .get("/latest")
    .reply(200, {
      rates: {
        CAD: 1.4698,
        HKD: 8.6924,
        ISK: 136.3,
        PHP: 57.307,
        DKK: 7.466,
        HUF: 326.96,
        CZK: 25.763,
        AUD: 1.6365,
        RON: 4.7345,
        SEK: 10.7223,
        IDR: 15772.45,
        INR: 77.34,
        BRL: 4.2958,
        RUB: 72.5055,
        HRK: 7.3815,
        JPY: 118.57,
        THB: 34.157,
        CHF: 1.0931,
        SGD: 1.529,
        PLN: 4.3014,
        BGN: 1.9558,
        TRY: 6.2221,
        CNY: 7.7058,
        NOK: 9.9105,
        NZD: 1.7026,
        ZAR: 16.3271,
        USD: 1.1106,
        MXN: 21.4542,
        ILS: 3.8786,
        GBP: 0.91505,
        KRW: 1333.44,
        MYR: 4.6173
      },
      base: "EUR",
      date: "2019-08-02"
    });
  myRequest("http://api.ratesapi.io/api/latest", (error, response) => {
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
