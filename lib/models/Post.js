const pool = require('../utils/pool');

module.exports = class Post {
    id;
    photo_url;
    caption;
    username;

    constructor(row) {
        this.id = row.id;
        this.photo_url = row.photo_url;
        this.caption = row.caption;
        this.username = row.username;
    }

    static async createPost({ photo_url, caption, username}) {
        const {
            rows,
        } = await pool.query(
            'INSERT INTO posts (photo_url, caption, username) VALUES ($1, $2, $3) RETURNING *',
            [photo_url, caption, username]
        );

        return new Post(rows[0]);
    }

    static async getAllPost() {
        const { rows } = await pool.query('SELECT * FROM posts');

        return rows.map((row) => new Post(row));
    }
}