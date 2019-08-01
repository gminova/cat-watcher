const http = require('http');
const router = require('./router');

let port = process.env.PORT || 3000;

const server = http.createServer(router);

server.listen(port, () => {
    console.log(`Server up and running on port: ${port}`);
});