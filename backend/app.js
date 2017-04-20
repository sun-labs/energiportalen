import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.write('Welcome to the api.');
  res.send();
});

app.listen(4000, () => {
  console.log('Sun Labs API is running.');
});