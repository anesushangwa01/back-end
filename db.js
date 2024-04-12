const mongoose = require('mongoose');
// mongodb+srv://shangwa01:0734611236@cluster0.r52paqm.mongodb.net
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://shangwa01:0734611236@cluster0.r52paqm.mongodb.net', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB ');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1); // Exit processx on error
  }
};

module.exports = connectDB;