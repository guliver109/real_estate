const   mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/real-estate', {
    useNewUrlParser: true,
    useCreateIndex: true
});