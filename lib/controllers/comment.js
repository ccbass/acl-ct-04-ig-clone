const { Router } = require('express');
const checkAuth = require('../middleware/checkAuth');
const Comment = require('../models/comment');

module.exports = Router ()

.post('/', checkAuth, (req, res, next) => {
  Comment.createComment({
    ...req.body,
    comment_by: req.user.ghUsername
  }, 
  )
    
  .then((post) => res.send(post))
  .catch(next);
})

.delete('/:id', checkAuth, (req, res, next) => {
  Comment.deleteSingleComment(req.params.id, req.user.ghUsername)
    .then(deletedComment => res.send(deletedComment))
    .catch(next)
})