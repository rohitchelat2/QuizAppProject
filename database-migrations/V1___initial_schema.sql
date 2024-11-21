CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  admin BOOLEAN DEFAULT FALSE,
  password CHAR(128)
);

CREATE TABLE topics (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) REFERENCES users(id),
  topic VARCHAR(255) UNIQUE
);

CREATE TABLE questions (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) REFERENCES users(id),
  topic_id CHAR(36) REFERENCES topics(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL
);

CREATE TABLE question_answer_options (
  id CHAR(36) PRIMARY KEY,
  question_id CHAR(36) REFERENCES questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE
);

CREATE TABLE question_answers (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) REFERENCES users(id),
  topic_id CHAR(36) REFERENCES topics(id) ON DELETE SET NULL,
  question_id CHAR(36) REFERENCES questions(id) ON DELETE SET NULL,
  question_answer_option_id CHAR(36) REFERENCES question_answer_options(id) ON DELETE SET NULL,
  is_correct BOOLEAN DEFAULT FALSE
);

CREATE UNIQUE INDEX ON users((lower(email)));