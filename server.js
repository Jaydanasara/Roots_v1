const express = require("express");

const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 3001;
var http = require('http').createServer(app);
const socket=require('socket.io');
const io =socket(http);

// Define middleware here

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Serve up static assets (usually on heroku)

if (process.env.NODE_ENV === "production") {

  app.use(express.static("client/build"));

}

// Add routes, both API and view

app.use(routes);



// Connect to the Mongo DB

mongoose.connect(

  process.env.MONGODB_URI ||

  "mongodb://localhost:27017/usersDatabase",





);

const users = {};

io.on('connection', function (socket) {
  console.log('a user connected');

  

  if (!users[socket.id]) {
    users[socket.id] = socket.id;
  }
  socket.emit("yourID", socket.id);
  io.sockets.emit("allUsers", users);

  socket.on('message', (data) => {
  
    io.emit("message", data);
  })


  socket.on('disconnect', function () {
    delete users[socket.id];
    console.log('user disconnected');
  })


  socket.on("callUser", (data) => {
   
    io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from });
  })

  socket.on("acceptCall", (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  })

});




// Start the API server

http.listen(PORT, function () {

  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);

});


