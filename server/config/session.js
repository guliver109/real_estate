const session = require('express-session');

module.exports = function (app) {
    app.set('trust proxy', 1)
    app.use(session({
        key: 'user_sid',
        secret: 'team_work',
        saveUninitialized: true,
        resave: true,
        cookie: { secure: true }
    }))
}