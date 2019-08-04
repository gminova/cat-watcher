const { handleHome, handlePublic, handleQuery } = require("./handler");

const router = (req, res) => {
  const endpoint = req.url;

  if (endpoint === "/") {
    handleHome(req, res, endpoint);
  } else if (endpoint.indexOf("public") !== -1) {
    handlePublic(req, res, endpoint);
  } else if(endpoint.startsWith("/query?=")) {
    handleQuery(req, res, endpoint);
  }else {
    res.writeHead(404);
    res.end(
      `<h1>404: Page Not Found</h1>`
    );
  }
};

module.exports = router;