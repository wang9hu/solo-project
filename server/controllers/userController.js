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
        message: {err: 'Username existed!'}
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
      message: {err: 'Username and password must be string!'}
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
          message: { err: 'Password is wrong!'}
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
  const _id = req.cookies.ssid;
  const { time, priority, description, title } = req.body;
  const userInfo = res.locals.data;
  userInfo.todoList.push({ time, priority, description, title });
  
  // here if use save would reset the password hash
  User.findByIdAndUpdate({ _id }, userInfo, { new: true }, (err, data) => {
    if(err) return next({
      log: 'userController.addNewItem, Error: could not save item',
      message: { err: 'could not save item'}
    })
    res.locals.data = data;
    return next(); 
  });
}

userController.deleteItem = async (req, res, next) => {
  const userInfo = res.locals.data;
  const _id = req.cookies.ssid;
  const item_id = req.body.item_id;
  const item = userInfo.todoList.id(item_id);
  const index = userInfo.todoList.indexOf(item);
  userInfo.todoList.splice(index, 1);
  User.findByIdAndUpdate( { _id }, userInfo, { new: true }, (err, data) => {
    if(err) return next({
      log: 'userController.deleteItem, Error: could not delete item',
      message: { err: 'could not delete item'}
    })
    res.locals.data = data;
    return next();
  });

}


userController.getUserInfo = async (req, res, next) => {
  if (res.locals.data) return next();

  const _id = req.cookies.ssid;
 
  User.findOne( { _id }, (err, data) => {
      if(!data) return next({
        log: 'userController.getUserInfo, Error: data not exist in db',
        message: { err: 'data not existed'}
      })
      if(err) return next({
        log: 'userController.getUserInfo, Error: db error',
        message: { err: 'error from database'}
      })
      res.locals.data = data;
      return next();
      }
  )
}


userController.updateInfo = (req, res, next) => {
  const userInfo = res.locals.data;
  const _id = req.cookies.ssid;
  const { item_id, completion } = req.body;
  const item = userInfo.todoList.id(item_id);
  item.completion = completion;
  User.findByIdAndUpdate( { _id }, userInfo, { new: true }, (err, data) => {
    if(err) next({
      log: 'userController.addNewItem, Error: could not save item',
      message: { err: 'could not save item'}
    })
    res.locals.data = data;
    next();
  });
}


module.exports = userController;