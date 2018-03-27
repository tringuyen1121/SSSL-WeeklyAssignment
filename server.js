const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const response = `IP: ${req.ip} ,Parameter: ${req.query.myParam}`;
  res.send(response);
});

app.get('/path1/:param1', (req, res) => {
  const response = `Parameter: ${req.params.param1}`;
  res.send(response);
});

app.get(['/path2', '/path3'], (req, res) => {
  const response = `Path: ${req.hostname}${req.path}`;
  res.send(response);
});

app.get(/path[4-9]{1}$/g, (req, res) => {
  const response = `Path: ${req.hostname}${req.path}`;
  res.send(response);
});

app.get('/json-response', (req, res) => {
  const response = {id: 1, name: 'My response'};
  res.send(response);
});

app.post('/to-google', (req, res) => {
  res.redirect('https://google.fi');
});

  app.get('/not-gonna-find', (req, res) => {
  res.sendStatus(404);
});

app.get('/give-me-cookie', (req, res) => {
  res.cookie('for', 'you');
  const response = 'Cookie set';
  res.send(response);
});

app.delete('/cookie-for', (req, res) => {
  res.clearCookie('for');
  res.sendStatus(200);
});

const router = express.Router();
router.get('/path', (req, res) => {
  res.sendStatus(200);
});
app.use('/routed', router);

app.listen(4000);