const express = require("express");
const os = require("os");
const passport = require("passport");
const Session = require("express-session");
const morgan = require("morgan");
const mongoStore = require("connect-mongo");
const { initializeDatabase } = require("./database/connect");
const mongoose = require("mongoose");
const initializePassport = require("./strategy/passport-local");
const userRouter = require("./routes/user.routes");
const ejs = require('ejs');

initializeDatabase();

const app = express();

initializePassport(passport);



app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  Session({
    secret: "my_secret",
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(userRouter);

const port = process.env.PORT || 3000;

function getInterfaceIP() {
  const interfaces = os.networkInterfaces();
  for (let name in interfaces) {
    for (let interface of interfaces[name]) {
      if (interface.family === "IPv4" && !interface.internal) {
        return interface.address;
      }
    }
  }

  return "127.0.0.1";
}

const IPAddress = getInterfaceIP();

app.listen(port, () => {
  console.log(`server running at ${IPAddress}:${port} `);
});
