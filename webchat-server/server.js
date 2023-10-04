const http = require("http");
const app = require("./app");
const port = process.env.PORT || 9090;
const httpServer = http.createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

 
io.on("connection", require("./app_socket"));


httpServer.listen(port, () => {
  console.log("server\t::\t" + port);
});
