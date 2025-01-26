const express = require('express');
const router = express.Router();
const { registerForm, loginForm, register, dashboard, feed, profile , logout} = require('../controllers/user.controller');
const { ensureGuest, ensureAuth } = require('../middlewares/auth');
const passport = require('passport')

router.get('/', ensureGuest, registerForm);
router.get('/login', ensureGuest, loginForm);
router.post('/register', register);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
);

router.get("/dashboard", ensureAuth, dashboard);
router.get('/feed', ensureAuth, feed);
router.get('/profile', ensureAuth, profile);
router.get('/logout', ensureAuth, logout);

module.exports = router;
