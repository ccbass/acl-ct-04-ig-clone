DROP TABLE IF EXISTS users CASCADE; 

CREATE TABLE users (
    gh_username TEXT NOT NULL PRIMARY KEY,
    gh_avatar TEXT NOT NULL
);