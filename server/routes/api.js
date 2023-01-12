const express = require('express');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.cookies.ssid) {
    res.redirect(301, `/user/${req.cookies.ssid}`);
  } else {
    res.redirect(301, '/signup');
  }
});


// for login
router.post('/login', userController.verifyuser, cookieController.setSSIDCookie, (req, res) => {
  res.status(200).send({})
});

module.exports = router;

