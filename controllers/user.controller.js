const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const registerForm = async (req, res) => {
  res.render("login.ejs");
};

const loginForm = async (req, res) => {
  res.render("register.ejs");
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  let hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const isUserExists = await User.findOne({ username });

    if (isUserExists) {
      return res.status(400).json({ error: "User already Exists " });
    }

    const user = new User({ username, password: hashedPassword, email });
    await user.save();

    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

const logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

const dashboard = (req, res) => {
  console.log(req.user);
  res.render("dashboard.ejs", { user: req.user });
};

module.exports = { registerForm, loginForm, register, logout, dashboard };
