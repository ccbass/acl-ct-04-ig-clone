const pool = require('../utils/pool');

module.exports = class Comment {
    commentId;
    comment;
    linkedPost;
    commentBy;
    
    constructor(row) {
        this.commentId = row.comment_id;
        this.comment = row.comment;
        this.linkedPost = row.post;
        this.commentBy = row.comment_by;
    }

    static async createComment({ comment, post }, commentBy ) {
        console.log(comment, post, commentBy)
        const {
            rows,
        } = await pool.query(
            'INSERT INTO comments (comment, post, comment_by) VALUES ($1, $2, $3) RETURNING *',
            [comment, post, commentBy]

        );

        return new Comment(rows[0]);
    }
    
    static async deleteSingleComment(commentId, user) {
        const selectedRow
        = await pool.query(
            'SELECT * FROM comments where comment_id=$1',
            [commentId]
        );
        if(selectedRow['rows'][0]['comment_by'] === user) {
            const {
                rows,
            } = await pool.query(
                'DELETE FROM comments where comment_id=$1 RETURNING *',
                [commentId]
            );
    
            return new Comment(rows[0]);
        } 
            return 'Users Do Not Match'
    }
}

    