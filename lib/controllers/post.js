const { Router } = require('express');
const checkAuth = require('../middleware/checkAuth');
const Post = require('../models/Post');

module.exports = Router()
