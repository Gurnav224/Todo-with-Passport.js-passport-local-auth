const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

const initializeDatabase = async () => {
  try {
    await mongoose.connect(uri)
    console.log("successfully connected to the database");
  }
  catch (error) {
    console.error(`error to connecting `, error);
  }
}

module.exports = {initializeDatabase}
