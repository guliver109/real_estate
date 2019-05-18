require('dotenv').config();

require('mongoose').connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
});


