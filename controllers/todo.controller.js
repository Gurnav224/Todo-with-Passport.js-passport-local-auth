const Todo = require("../models/todo.model");


exports.todoForm = (req, res) => {
  const form = `<div>
        <h1>Create New Todo </h1>
        <form action="/newtodo" method="post">
        <div>
        <label for="title">Title </label>
        <input type="text" name="title" id="title" />
        </div>
        <div>
        <label for="completed">
        Completed </label>
        <input type="checkbox" name="completed" id="completed"  />
        </div>
        <button type="submit">add todo </button>
        </form>
         <a href="/dashboard">back to dashboard </a>
    </div>`
  
  res.send(form)
}

exports.createTodo = async (req, res)=>{
  const {title, completed} = req.body;
  console.log('req.body', req.body);
  console.log('user',req.user.id)
    try{
      const todo = new Todo({ title, completed:completed === "on", user:req.user.id });
      await todo.save();
      console.log(todo)
      res.redirect('/dashboard')
    }
    catch(error){
      console.error('error to create new todo',error)
    }
}

