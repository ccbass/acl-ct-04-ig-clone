const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/user');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/comment');

jest.mock('../lib/middleware/checkAuth.js', () => (req, res, next) => {
  req.user = {
    ghUsername: 'test',
    ghAvatar: 'http://image.com/image.png',
  };
  next();
});
describe('posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a post using POST', async () => {
    await User.createUser({
      ghUsername: 'test',
      ghAvatar: 'http://image.com/image.png',
    });
    return request(app)
      .post('/api/v1/post')
      .send({ 
        photo_url: 'http://hellothere.com',
        caption: 'hello there',
      })
      .then((res) => {
          expect(res.body).toEqual({
            id: '1',
            photo_url: 'http://hellothere.com',
            caption: 'hello there',
            username: 'test',
          })
      })
  })

  it('gets all posts', async () => {
    await User.createUser({
      ghUsername: 'test',
      ghAvatar: 'http://image.com/image.png',
    });
    await Post.createPost(
      {
        photo_url: 'http://hellothere.com',
        caption: 'hi',
        username: 'test'
      });
  return request(app)
    .get('/api/v1/post')
    .then((res) => {
      expect(res.body[0]).toEqual(
        {
          id: '1',
          photo_url: 'http://hellothere.com',
          caption: 'hi',
          username: 'test',
        })
    })
  })
  it('gets a post by id', async () => {
    await User.createUser({
      ghUsername: 'test',
      ghAvatar: 'http://image.com/image.png',
    });
    await Post.createPost(
      {
        photo_url: 'http://hellothere.com',
        caption: 'hi',
        username: 'test'
      });

      return request(app)
        .get('/api/v1/post/1')
        .then((res) => {
          expect(res.body).toEqual({
            id: '1',
            photo_url: 'http://hellothere.com',
            caption: 'hi',
            username: 'test',
            comment: null,
            comment_by: null,
            comment_id: null,
            gh_avatar: null,
            gh_username: null,
            post: null,
          })
        })
  });

  it('updates a post using PATCH', async () => {
    await User.createUser({
      ghUsername: 'test',
      ghAvatar: 'http://image.com/image.png',
    });
    await Post.createPost(
      {
        photo_url: 'http://hellothere.com',
        caption: 'hi',
        username: 'test'
      });

      return request(app)
        .patch('/api/v1/post/1')
        .send({
          id: 1, 
          caption: 'updated',
        })
        .then((res) => {
          expect(res.body).toEqual({
            id: '1',
            photo_url: 'http://hellothere.com',
            caption: 'updated',
            username: 'test',
          })
        })
  })

  it('deletes post by id', async () => {
    await User.createUser({
      ghUsername: 'test',
      ghAvatar: 'http://image.com/image.png',
    });
    await Post.createPost(
      {
        photo_url: 'http://hellothere.com',
        caption: 'hi',
        username: 'test'
      });

      return request(app)
        .delete('/api/v1/post/1')
        .then((res) => {
          expect(res.body).toEqual({
            id: '1',
            photo_url: 'http://hellothere.com',
            caption: 'hi',
            username: 'test'
          })
        })
  })

  it('gets top 10 popular post', async () => {
    await User.createUser({
      ghUsername: 'test',
      ghAvatar: 'http://image.com/image.png',
    });
    await Post.createPost(
      {
        photo_url: 'http://hellothere.com',
        caption: 'hi',
        username: 'test'
      });
      await Post.createPost(
        {
          photo_url: 'http://dog.com',
          caption: 'dog',
          username: 'test'
        });

      return request(app)
        .get('/api/v1/post/popular')
        .then((res) => {
          expect(res.body).toEqual([
            {
              id: '2',
              total_comments: '0'
            },
            {
              id: '1',
              total_comments: '0'
            }
          ])
        })
  })
});

describe('comments routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('adds a comment using POST', async () => {
    await Comment.createcomment({

    })

    return request(app)
      .post('/api/v1/comment')
      .then((res) => {
        expect(res.body).toEqual({

        })
      })
  })

  it('deletes comment', async () => {
    await Comment.createcomment({

    })

    return request(app)
      .delete('/api/v1/comment/1')
      .then((res) => {
        expect(res.body).toEqual({

        })
      })
  })
});
