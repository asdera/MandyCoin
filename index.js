const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/static"));

fractals = []

console.log("hi")

function onConnection(socket){
  console.log("User connected");
  socket.on("mine", function (data) {
      fractals.append(data);
      console.log(fractals);
  });
  socket.on("disconnect", function(){
    console.log("user disconnected");
  });
}

io.on("connection", onConnection);

http.listen(port, () => console.log("listening on port " + port));


