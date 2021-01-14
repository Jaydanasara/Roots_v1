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


io.on('connection', socket => {
  const id = socket.handshake.query.id
  console.log("member Joined" + id)
  console.log("user Connected ")
  socket.on('send-Id', (idnum) => {

    socket.join(idnum)

    console.log("member Joined" + idnum)
  })

  socket.on('send-message', (data) => {
    
    

    socket.to(data.friends_id).emit('receive-message', {
      dataa: data
     
      
    })

   socket.on('error',function(err){
     console.log(err)
   })
  })

})









// const users = [];

// io.on('connection', function (socket) {
//   console.log('a user connected');
//   socket.on('join-room', (Name, userId, screenName, scrId) => {
//     console.log(Name, userId, screenName, scrId)
//     // socket.join(Name)
//     socket.broadcast.emit('user-connected', Name, userId, screenName, scrId)
//     let user = {
//       "name": Name,
//       "userid": userId,
//       "socketId": socket.id,
//       "screenName": screenName,
//       "scrId": scrId
//     }


//     socket.emit("yourinfo", user);
//     users.push(user)
//     io.sockets.emit("allUsers", users);

//     socket.on('message', (data) => {
//       console.log(data)

//       io.emit('message', (data) => {
//         console.log("emitting")
//       })

//     })




//     socket.on("callUser", (data) => {
//       console.log(data)
//       io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from });
//       console.log("this is the Data @@@@@@@@@@@@@@@")
//       console.log(data.userToCall)
//     })

//     socket.on("acceptCall", (data) => {
//       io.to(data.to).emit('callAccepted', data.signal);

//     })

//     socket.on('disconnect', function () {
//       socket.broadcast.emit("user-disconnected", (socket.id))

//       users.forEach(function (obj) {
//         if (obj.socketId === socket.id) {
//           delete obj
//           io.sockets.emit("allUsers", users);
//         } else {
//           null
//         }
//       });

//       console.log('user disconnected')

//       console.log(users)

//     })



//   })
// });




// Start the API server

http.listen(PORT, function () {

  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);

});


