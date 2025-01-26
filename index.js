const express = require("express");
const session = require("express-session");
const passport = require("passport");
const  initializeStrategy = require('./strategy/passport.local')
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const { dbConnnect } = require("./db/connection");
const logger = require('morgan');
require('dotenv').config()

const userRouter = require("./routes/user.routes");
const todoRouter = require('./routes/todo.routes')

dbConnnect();

const app = express();

initializeStrategy(passport);


// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:process.env.MONGODB_URI
    }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(userRouter);
app.use(todoRouter);

const port = 3000;

app.listen(port, (req, res) => {
  console.log(`server started at http://localhost:${port}`);
});
