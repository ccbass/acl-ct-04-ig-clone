const { Router } = require('express');
const checkAuth = require('../middleware/checkAuth');
const Post = require('../models/Post');

module.exports = Router()

.post('/', checkAuth, (req, res, next) => {
    Post.createPost({
        ...req.body,
        username: req.user.ghUsername,
    })
    .then((post) => res.send(post))
    .catch(next);
})


.get('/', (req, res, next) => {
    Post.getAllPost()
        .then((post) => res.send(post))
        .catch(next);
})


.get('/popular', (req, res, next) => {
    Post.getPopularPosts()
        .then(popularPosts => res.send(popularPosts))
        .catch(next)
})


.get('/:id', (req, res, next) => {
    //fetch single post, include user who posted, and all comments with their usernames
    Post.getSinglePost(req.params.id)   
    .then(singlePost => res.send(singlePost))
    .catch(next)
})


.patch('/:id', checkAuth, (req, res, next) => {
    //requires auth, only update caption of post, returns updated post, and user must match post user
    //fetch post by param.id > acquire username from post
    //if that post username = req.user.username?
    Post.getSinglePost(req.params.id)
        .then(post => {
            //right req username?
            if (post.username === req.user.ghUsername){
                Post.updateSinglePost(req.params.id, req.body.caption)
                    .then(updatedPost => res.send(updatedPost))
                    .catch(next)
            }
        })   
        .catch(next)  
    })
    

.delete('/:id', checkAuth, (req, res, next) => {
    //reqires auth, deletes single post by id, returns deleted, and user must match post user
    Post.getSinglePost(req.params.id)
        .then(post => {
            //right req username?
            if (post.username === req.user.ghUsername){
                Post.deleteSinglePost(req.params.id)
                    .then(deletedPost => res.send(deletedPost))
                    .catch(next)
            }
        })   
        .catch(next)
})

