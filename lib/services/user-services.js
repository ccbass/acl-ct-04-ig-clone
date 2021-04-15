const { fetchGhToken, fetchUserProfile } = require('../utils/gh-utils');
const User = require('../models/user');

module.exports = class UserService {
    static async create (ghCode){
        // const token = await //token fetch from GH

        const token = await fetchGhToken(ghCode);
        console.log(token);
        //parse the api after getting the tokens
        //pass in token to profile call above

        const userProfile = await fetchUserProfile(token);
        console.log(userProfile);
        

        //find or create new User in DB
        //Pass in data from above
        //query model class here

        const ghUser = await User.findUserName(userProfile.ghUsername);
        if (!ghUser) {
            return User.createUser(userProfile);
        } else {
            return User.updateAvatar(userProfile);
        }
    }
};