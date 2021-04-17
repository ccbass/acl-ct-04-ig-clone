const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/user');
const Post = require('../lib/models/Post');

jest.mock('../lib/middleware/checkAuth.js', () => (req, res, next) => {
  req.user = {
    gh_username: 'test',
    gh_avatar: 'http://image.com/image.png',
  };
  next();
});
describe('tardygram routes', () => {
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
});
