module.exports = class User {
    ghUsername;
    ghAvatar;
    
    constructor(rows){
        this.ghUsername = rows.gh_username
        this.ghAvatar = rows.gh_avatar
    }




}