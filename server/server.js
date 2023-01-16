const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');

const app = express();

const PORT = 3000;

const mongoURI = 'mongodb+srv://wang9hu:DWI8DpND4rxwUfaO@cluster0.4mbtnas.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/', express.static(path.join(__dirname, '../dist')));

app.get('/logout', cookieController.logout, (req, res) => {
  console.log('get /logout');
  res.status(200).json("You have logged out!");
});

app.get('/cookie', cookieController.verifySSIDCookie, userController.getUserInfo, (req, res) => {
  console.log('get /cookie');
  res.status(200).send(res.locals.data);
});

app.post('/signup', userController.createUser, cookieController.setSSIDCookie, (req, res) => {
  console.log('post /signup');
  res.status(200).send(res.locals.data);
});

app.post('/login', userController.verifyuser, cookieController.setSSIDCookie, (req, res) => {
  console.log('post /login');
  res.status(200).send(res.locals.data);
});

app.post('/:username/newitem', cookieController.verifySSIDCookie, userController.addNewItem, (req, res) => {
  console.log('post /:username/newitem');
  res.status(200).send(res.locals.data);
});

app.put('/:username', cookieController.verifySSIDCookie, userController.updateInfo, (req, res) => {
  console.log('put /:username');
  res.status(200).send(res.locals.data);
});

app.delete('/:username', cookieController.verifySSIDCookie, userController.deleteItem, (req, res) => {
  console.log('delete /:username');
  res.status(200).send(res.locals.data);
});

app.get('/:username', userController.getUserInfo, (req, res) => {
  console.log('get /:username');
  res.status(200).send(res.locals.data);
});

app.get('/', (req, res) => {
  console.log('get /');
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// all others
app.use( '*' , (req, res) => {
  console.log('use *');
  res.status(404).send({message: 'This is not the page you\'re looking for...'})
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
