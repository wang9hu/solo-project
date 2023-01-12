const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = async (req, res, next) => {
  if (typeof(req.body.username) === 'string' && typeof(req.body.password) === 'string' && req.body.username !== '' && req.body.password !== '') {
    const { username, password } = req.body;
    const existed = await User.findOne({ username }).exec();

    if (existed) {
      next({
        log: 'userController.createUser, Error: username existed in db',
        message: {err: 'Username existed'}
      })
    } else {
      const newUser = User({username, password});

      newUser.save()
      .then((data) => {
        res.locals.id = data._id;
        res.locals.data = data;
        next();
      })
      .catch(err => next({
        log: `userController.createUser, Error: ${err}`,
        message: {err: 'Create user failed'}
      }))
    }
  } else {
    next({
      log: 'userController.createUser, Error: username or password is not string',
      message: {err: 'Username and password should be string'}
    });
  }
}



userController.verifyuser = async (req, res, next) => {
  const { username, password } = req.body;
  
  User.findOne({ username }, (err, data) => {
      if(data === null) return next({
        log: 'userController.verifyuser, Error: data for this username does not exist in db',
        message: { err: 'username not existed'}
      })
      if(err) return next({
        log: 'userController.verifyuser, Error: db error',
        message: { err: 'error from database'}
      })
      if (!bcrypt.compareSync(password, data.password)) {
        return next({
          log: 'userController.verifyuser, Error: password is wrong',
          message: { err: 'password is wrong'}
        })
      } else {
        res.locals.id = data._id;
        res.locals.data = data;
        return next();
      }
    }
  )
}

userController.addNewItem = async (req, res, next) => {
  const { time, priority, description, title } = req.body;
  const username = req.params.username;
  const userInfo = await User.findOne({ username }).exec();
  userInfo.todoList.push({ time, priority, description, title });
  // here if use save would reset the password hash
  User.findOneAndUpdate({ username }, userInfo, (err, data) => {
    if(err) next({
      log: 'userController.addNewItem, Error: could not save item',
      message: { err: 'could not save item'}
    })

    User.findOne({ username })
    .exec()
    .then((data) => {
      res.locals.data = data;
      next();
    })    
  });
}


userController.getUserInfo = async (req, res, next) => {
  const { username } = req.body;
  
  User.findOne({ username }, (err, data) => {
      if(!data) return next({
        log: 'userController.verifyuser, Error: data for this username does not exist in db',
        message: { err: 'username not existed'}
      })
      if(err) return next({
        log: 'userController.verifyuser, Error: db error',
        message: { err: 'error from database'}
      })
      if (!bcrypt.compareSync(password, data.password)) {
        return next({
          log: 'userController.verifyuser, Error: password is wrong',
          message: { err: 'password is wrong'}
        })
      } else {
        res.locals.id = data._id;
        res.locals.data = data;
        return next();
      }
    }
  )
}


module.exports = userController;