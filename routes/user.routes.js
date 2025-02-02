const express = require('express');
const { registerForm , loginForm, register  , logout, dashboard } = require('../controllers/user.controller');
const { ensureGuest, ensureAuth } = require('../middlewares/auth');
const router = express.Router();
const passport = require('passport')

router.get('/register',ensureGuest , registerForm);
router.get('/login', ensureGuest, loginForm);
router.post('/register', register);
router.post('/login',  passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/dashboard",
}));
router.get('/logout',logout)
router.get('/dashboard', ensureAuth, dashboard);


module.exports = router;