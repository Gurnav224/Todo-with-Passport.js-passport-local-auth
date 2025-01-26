const User = require("../models/users.model");
const Todo = require('../models/todo.model');
const bcryptjs = require('bcryptjs')

exports.registerForm = async function (req, res) {
  const form = `<div>
    <h1>Register </h1>
    <form action="/register" method="post">
    <div>
    <label for="username">Username:</label>
    <input type="text" name="username" id="username" />
    </div>
    <div>
    <label for="password">Password: </label>
    <input type="password" name="password" id="password" />
    </div>
    <button type="submit">Submit</button>
    </form>
    <a href="/login"> Login </a>
    </div>`;

  res.send(form);
};

exports.loginForm = async function (req, res) {
  const form = `<div>
    <h1>Login </h1>
    <form action="/login" method="post">
    <div>
    <label for="username">Username:</label>
    <input type="text" name="username" id="username" />
    </div>
    <div>
    <label for="password">Password: </label>
    <input type="password" name="password" id="password" />
    </div>
    <button type="submit">Submit</button>
    </form>
    <a href="/">Register </a>
    </div>`;

  res.send(form);
};

exports.register = async function (req, res) {
  const { username, password } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const user = new User({ username, password: hashedPassword });

  await user.save();

  console.log("saved user", user);

  res.redirect("/login");
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
  console.log("login failed");
};

exports.dashboard = async (req, res) => {
  console.log(req.user);
  const todos = await Todo.find({ user: req.user.id });
  console.log(todos)
  res.send(`<div>
    <h1>Welcome To Dasboard ${req.user.username} </h1>
    <a href="/logout">Log Out </a>
    <a href="/newtodo">Create New Todo</a>
    <a href="/profile">Profile </a>

    </div>`);
};

exports.feed = (req, res) => {
  console.log(req.user);
  res.send(`<div>
    <h1>Welcome To feed ${req.user.username} </h1>
    <a href="/dashboard">back to dashboard </a>
    </div>`);
};

exports.profile = (req, res) => {
  console.log(req.user);
  res.send(`<div>
    <h1>Welcome To Dasboard ${req.user.username} </h1>
    <a href="/dashboard">back to dashboard </a>
    </div>`);
};
