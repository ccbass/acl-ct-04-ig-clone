const { json } = require('express');
const fetch = require('node-fetch');

const fetchGhToken = (code) => {
    //fetch gh token using code from parameter
    //use POST REQ and requst in body.json
    return fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        body: json.stringify({
            client_id: process.env.GH_CLIENT_ID,
            client_secret: process.env.GH_CLIENT_SECRET,
            code
        })
    })
    .then((res) => res.json())
    .then(({ access_token }) => access_token);
    

}

const fetchUserProfile = (token) => {
    //fetch user data using token and return data
    return fetch('https://api.github.com/user', {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${token}`,
        },
    })
    .then((res) => res.json())
    .then(({ login, avatar_url }) => ({
        ghUsername: login,
        ghAvatar: avatar_url,
    }));
};



module.exports = 
    fetchGhToken, 
    fetchUserProfile    