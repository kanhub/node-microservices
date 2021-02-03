const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// assign random ID from crypto pkg
const { randomBytes } = require('crypto');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 4001;

// in memory repository for posts
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(PORT, () => {
  console.log(`🌠 Posts service listening on port ${PORT}`);
});
