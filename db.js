const dns = require('dns');
dns.setServers(['8.8.8.8','8.8.4.4']);


MONGODB_URL_LOCAL = 'mongodb://localhost:27017/hotels'
require('dotenv').config();
const mongoose = require('mongoose');
//define the MongoDB URL connection
//const mongoURL = 'mongodb://localhost:27017/hotels'
//const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoURL ='mongodb+srv://oyon3456321_db_user:oyon123@cluster0.1zbytxj.mongodb.net/'

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