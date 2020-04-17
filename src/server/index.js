var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("chat message", function(msg) {
    console.log(msg, "chat message received on server");
    io.emit("chat message", msg);
  });
});

const port = process.env.PORT;
http.listen(port, () => console.log(`Listening on ${port}`));
