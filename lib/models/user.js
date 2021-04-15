const { pool } = require("../utils/pool");


module.exports = class User {
    ghUsername;
    ghAvatar;
    
    constructor(rows){
        this.ghUsername = rows.gh_username
        this.ghAvatar = rows.gh_avatar
    } 
 static async createUser(ghUsername, ghAvatar) {
     const {
         rows,
     } = await pool.query('INSERT INTO users (gh_username, gh_avatar) VALUES ($1, $2) RETURNING *', [ghUsername, ghAvatar]
     )

     return new User(rows[0]);
 }

 static async findUserName(ghUsername) {
     const {
         rows
     } = await pool.query('SELECT * FROM users WHERE gh_username=$1', [ghUsername]
     )
    if(rows.length < 1 ) return null;
    return new User(rows[0])
 }



}