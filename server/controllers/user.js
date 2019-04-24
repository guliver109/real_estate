var User = require('../models/User');

// cookie but no session
function checkForCookie(req, res, next) {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
}

// cookie with session
function checkForSession(req, res, next) {
    let { user_sid } = req.cookies,
        { user } = req.session;
    if (user_sid && user) {
        let { userName, likes, listings } = user,
            payload = { userName, likes, listings };
        return res.send(payload);
    }
    next();
}


function logIn(req, res) {
    let { userName, password } = req.body;
    if (userName && password) {
        User.findOne({ userName }).then(user => {
            req.session.user = user;
            let { userName, likes, listings } = req.session.user;
            res.send(userName, likes, listings);
        }).catch(err => {
            if (err) throw err;
        })
    }

};

function signUp(req, res) {
    User.create(req.body).then(user => {
        req.session.user = user;
        let { userName, likes, listings } = req.session.user;
        res.send(userName, likes, listings);
    }).catch(err => {
        if (err) throw err;
    })
}

function logOut(req, res) {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        req.session.destroy();
        res.send('logout successful')
    } else {
        res.sendStatus(400);
    }
}

module.exports = {
    logIn,
    signUp,
    checkForCookie,
    checkForSession,
    logOut

}