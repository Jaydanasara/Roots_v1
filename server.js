const express = require("express");

const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 3001;
var http = require('http').createServer(app);
var io = require('socket.io')(http);

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



// Start the API server

http.listen(PORT, function() {

  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);

});


io.on('connection', function(socket){
  console.log('a user connected');

    socket.on('message', (data) => {
      console.log(data);
      io.emit("message",data);
  })

 
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});