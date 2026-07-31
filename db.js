const mongoose = require('mongoose');
//define the MongoDB URL connection
const mongoURL = 'mongodb://localhost:27017/hotels'

//set up MongoDB connection
mongoose.connect(mongoURL);
//Get the default connection
//moongoose maintains a default connection objec representing the mongoDB connection
const db = mongoose.connection;
//define event listeners for database connection
db.on('connected',()=>{
console.log('connected to mongodb server');
});

db.on('error',(err)=>{
  console.log('mongodb connection error');
});

db.on('disconnected',()=>{
  console.log('mongodb disconnected');
});