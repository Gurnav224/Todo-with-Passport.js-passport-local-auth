const mongoose = require('mongoose')
async  function dbConnnect(){
  try{
    const conn = mongoose.connect(process.env.MONGODB_URI);
    if(conn){
      console.log('connected to database')
    }
  }
  catch(error){
    console.error('connecting error' , error)
  }
}



module.exports = { dbConnnect};