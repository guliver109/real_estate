const   router = require('express').Router(),
        { logIn, signUp, checkForCookie, checkForSession, logOut } = require('../controllers/user');    

router.use(checkForCookie);

router.post('/', checkForSession, logIn);

router.post('/signup', checkForSession, signUp);

router.get('/logout', logOut);

module.exports = router;