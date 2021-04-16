DROP TABLE IF EXISTS users CASCADE; 
DROP TABLE IF EXISTS posts;

CREATE TABLE users (
    gh_username TEXT NOT NULL PRIMARY KEY,
    gh_avatar TEXT NOT NULL
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    photo_url TEXT NOT NULL,
    caption TEXT NOT NULL,
    username TEXT REFERENCES users(gh_username)
);