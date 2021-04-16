const { Router } = require('express')
const UserService = require('../services/user-services')
const { signToken } = require('../utils/jwt');
const checkAuth = require('../middleware/checkAuth');

const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = Router ()
    .get('/', (req, res) =>{
        res.send('You made it!')
    })
    
    .get('/login', (req, res) =>{
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}`)
    })

    .get('/login/callback', async (req, res, next) => {

        try {

            const user = await UserService.create(req.query.code)
            res.cookie('session', signToken(user),
            {
                httpOnly: true,
                maxAge: ONE_DAY,
                sameSite: 'strict',
    
            });
            res.redirect('/api/v1/auth/');
            
        } catch (error) {
            next(error);
        }
        
    })

    .get('/verify', checkAuth, (req, res, next) => {
        res.send(req.user);
    });