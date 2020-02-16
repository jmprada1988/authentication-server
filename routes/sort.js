const express = require('express');
const sortController = require('../controllers/sort');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/asc', isAuth, sortController.getAsc);
router.get('/des', isAuth, sortController.getDes);
router.get('/mix', isAuth, sortController.getMix);

module.exports = router;