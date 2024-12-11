const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {

  try{
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGO_URL)
    console.log("db connected")

}catch(error){

    console.log("db connction Error:")
    console.log(error)

}
  // try {
  //   console.log('Attempting to connect to MongoDB...');
  //   console.log('MongoDB URI:', process.env.MONGO_URI);

  //   await mongoose.connect(process.env.MONGO_URI);
  //   console.log('MongoDB Connected');
  // } catch (err) {
  //   console.error('Error connecting to MongoDB:', err.message);
  //   process.exit(1);
  // }
};

module.exports = connectDB;
