const { Router } = require('express')
const UserService = require('../services/user-services')


module.exports = Router ()
    .get('/login', (req, res) =>{
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}`)
    })

    .get('/login/callback', async (req, res, next) => {
        const user = await UserService.create(req.query.code)
        res.send(user)
    })