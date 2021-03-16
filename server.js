const express = require("express");

const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 3001;
var http = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(http);


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

  "mongodb://localhost:27017/usersDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

);


const users = [];


io.on('connection', socket => {
  const id = socket.handshake.query.id
  console.log("member Joined" + id)
  console.log("user Connected ")
  socket.on('send-Id', (idnum) => {

    socket.join(idnum)

    console.log("member Joined" + idnum)
  })

  socket.on('join-room', (Name, userId, screenName, scrId) => {
    console.log(Name, userId, screenName, scrId)
    // socket.join(Name)
    socket.broadcast.emit('user-connected', Name, userId, screenName, scrId)
    let user = {
      "name": Name,
      "userid": userId,
      "socketId": socket.id,
      "screenName": screenName,
      "scrId": scrId
    }


    socket.emit("yourinfo", user);
    users.push(user)
    io.sockets.emit("allUsers", users);


    socket.on("callUser", (data) => {
      console.log(data)
      io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from });
      console.log("this is the Data @@@@@@@@@@@@@@@")
      console.log(data.userToCall)
    })

    socket.on("acceptCall", (data) => {
      io.to(data.to).emit('callAccepted', data.signal);

    })

    socket.on('disconnect', function () {
      socket.broadcast.emit("user-disconnected", (socket.id))

      updatedUsers= users.filter(data=>data.socketId!=socket.id)
      updatedUsers

          io.sockets.emit("allUsers", updatedUsers);
   
      console.log('user disconnected')

      console.log(" these are the updated users" + updatedUsers)

    })



  })


  socket.on('send-message', (data) => {
    console.log(data)
    

    socket.to(data.friends_id).emit('receive-message', data)

   
  })

  socket.on('send-notification', (data) => {
    console.log(data)
    

    socket.to(data.id).emit('receive-notification', data)

   
  })


})


// Start the API server

http.listen(PORT, function () {

  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);

});


