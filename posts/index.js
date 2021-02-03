const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// assign random ID from crypto pkg
const { randomBytes } = require('crypto');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 4000;

// in memory repository for posts
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  res.status(201).send(posts[id]);
});

app.listen(PORT, () => {
  console.log(`🌠 Posts service listening on port ${PORT}`);
});
