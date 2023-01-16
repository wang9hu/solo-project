const cookieController = {};
const User = require('../models/userModel');

cookieController.setSSIDCookie = (req, res, next) => {
  if (res.locals.id) {
    res.cookie('ssid', res.locals.id, { httpOnly: true });
    return next()
  }
  else {
    return next({
      log: `cookieController.setSSIDCookie: Error`,
      message: {err: 'could not set SSID cookie'}
    });
  }
}

cookieController.verifySSIDCookie = (req, res, next) => {
  const _id = req.cookies.ssid;
  User.findOne({ _id }, (err, data) => {
    if(!data) return next({
      log: 'userController.verifySSIDCookie, Error: data for this _id does not exist in db',
      message: { err: 'cookie not valid'}
    })
    if(err) return next({
      log: 'userController.verifySSIDCookie, Error: db error',
      message: { err: 'error from database'}
    })
    res.locals.data = data;
    return next();
  })
}

cookieController.logout = (req, res, next) => {
    res.cookie('ssid', 'none', { httpOnly: true });   
    return next()
}


module.exports = cookieController;