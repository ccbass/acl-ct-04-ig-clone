const { Router } = require('express');
const checkAuth = require('../middleware/checkAuth');
const Post = require('../models/Post');

module.exports = Router()

.post('/', checkAuth, (req, res, next) => {
    Post.createPost({
        ...req.body,
        username: req.user.gh_username,
    })
    .then((post) => res.send(post))
    .catch(next);
})

.get('/', (req, res, next) => {
    Post.getAllPost()
        .then((post) => res.send(post))
        .catch(next);
})