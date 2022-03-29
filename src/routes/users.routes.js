const  {Router} = require('express');
const router = Router();

const { renderSignUpFrom, renderSigninFrom, signup, signin, logout } = require('../controllers/users.controller');

router.get('/users/signup', renderSignUpFrom);
router.post('/users/signup', signup);

router.get('/users/signin', renderSigninFrom);
router.post('/users/signin', signin);

router.get('/users/logout', logout);

module.exports = router;