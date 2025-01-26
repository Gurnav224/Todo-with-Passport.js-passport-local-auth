
const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title:String,
  completed:Boolean,
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  }
},{
  timestamps:true
})


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;