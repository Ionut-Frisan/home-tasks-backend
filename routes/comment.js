const express = require('express');
const { addComment } = require('../controllers/tasks')

const commentsRouter = express.Router();

commentsRouter.route('/').post(addComment);

module.exports = commentsRouter;