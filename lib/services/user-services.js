const { fetchGhToken, fetchUserProfile } = require('../utils/gh-utils');
const User = require('../models/user');

module.exports = class UserService {

    static async create (ghCode){
        //Fetch GH and acquire the token for the user after acquiring the param code.
        const token = await fetchGhToken(ghCode);
        console.log(token);

        //Fetch GH with the new token and returns back the user's profile data.
        const userProfile = await fetchUserProfile(token);
        console.log(userProfile);
        
        //Looks for the user in the DB and returns/creates it if they're not present.
        const ghUser = await User.findUserName(userProfile.ghUsername);
        if (!ghUser) {
            return User.createUser(userProfile);
        } else {
            return ghUser
        }
    }
};