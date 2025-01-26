
const express = require('express');
const { createTodo, todoForm,} = require('../controllers/todo.controller');
const { ensureAuth } = require('../middlewares/auth');
const router = express.Router();

router.get('/newtodo',ensureAuth,todoForm)
router.post('/newtodo', ensureAuth, createTodo);

module.exports = router;