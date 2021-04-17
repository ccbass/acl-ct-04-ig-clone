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

    static async getSinglePost (id) {
        const { rows } = await pool.query(
            `SELECT * FROM posts
            LEFT JOIN comments
            ON posts.id = comments.post
            LEFT JOIN users
            ON comments.comment_by = users.gh_username
            WHERE posts.id=$1
            `, [id]
        )
        //check and see what kind of data returns: can we use multiple construtors?
        console.log(rows)
        return rows[0]
    }

    static async updateSinglePost (id, caption) {
        const { rows } = await pool.query(
            `UPDATE posts SET caption=$1 WHERE id=$2 RETURNING *`,
            [caption, id]
        )
        return new Post(rows[0])
    }

    static async deleteSinglePost (id) {
        const { rows } = await pool.query(
            `DELETE FROM posts WHERE id=$1 RETURNING *`,
            [id]
        )
        return new Post(rows[0])
    }

    static async getPopularPosts () {
        const { rows } = await pool.query(
            `SELECT 
                posts.id,
                COUNT(comment) AS total_comments 
            FROM posts
            LEFT JOIN comments
            ON posts.id = comments.post
            GROUP BY posts.id
            ORDER BY 2 DESC
            LIMIT 10
            `
        )
        //check and see what kind of data returns: can we use multiple construtors?
        return rows
    }


}