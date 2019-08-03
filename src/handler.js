const fs = require("fs");
const path = require("path");
const env = require("dotenv").config();
const { myRequest } = require("./api");

function handleHome(req, res) {
  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { "content-type": "text/html" });
      res.end("<h1>Sorry, we had an error on our end!</h1>");
    } else {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(file);
    }
  });
}

function handlePublic(req, res, endpoint) {
  const extension = endpoint.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png"
  };
  const filePath = path.join(__dirname, "..", endpoint);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
    } else {
      res.writeHead(200, { "content-type": extensionType[extension] });
      res.end(file);
    }
  });
}

let handleQuery = (req, res) => {
  const input = req.url.split("=")[1];
  const url = `http://api.giphy.com/v1/gifs/search?q=${input}&api_key=${process.env.GIPHY_KEY}`;

  myRequest(url, (err, resAPI) => {
      if(err) {
          res.end ("Unable to fetch data.");
      } else {
          res.writeHead(resAPI.statusCode, { "content-type": "text/html" });
          res.end(JSON.stringify(resAPI.body.data));
      }
  });
};

module.exports = { handleHome, handlePublic, handleQuery };
