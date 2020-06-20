import express from 'express';

const app = express()

app.get('/', (req, res) => {
  return res.json({
    message: "Uhuuu!!! It's Working..."
  })
});

app.listen(3333);