var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send("<h1>Hello from the server side!</h1>");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("chat message", function(msg) {
    console.log(msg, "chat message received on server");
    io.emit("chat message", msg);
  });
});

const port = process.env.PORT ||8000; 
http.listen(port, () => console.log(`Listening on ${port}`));