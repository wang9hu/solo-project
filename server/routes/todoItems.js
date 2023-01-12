const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/:id', userController.getTodoInfo, (req, res) => {
  res.status(200).send();
});

module.exports = router;