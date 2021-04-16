const pool = require('../utils/pool');

module.exports = class Post {
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


}