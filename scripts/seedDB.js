const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/usersDatabase"
);

const scoreSeed = [
  {
    firstname: "jacob",
    lastname:"william",
    emailaddress: "jacob@yahoo.com",
    password: "gabriel1020"
  
  
   
  },

  {
    firstname: "komal",
    lastname:"sharma",
    emailaddress: "komal@yahoo.com",
    password: "gabriel102056"
  
  
   
  },


];

db.Score
  .remove({})
  .then(() => db.Score.collection.insertMany(scoreSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
