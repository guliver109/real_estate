const   express = require('express'),
        cookieParser = require('cookie-parser'),
        app = express(),
        path = require('path'),
        PORT = process.env.PORT || 3001,
        userRoutes = require('./routes/user'),
        listingRoutes = require('./routes/listing');


require('./config/connection'); // connection to data base

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser());


// app.use(methodOverride());
// app.use(bodyParser({keepExtensions:false,uploadDir:path.join(__dirname,'/files')}));

app.get('/favicon.ico', (req, res, next) => {
    next();
})

require('./config/session')(app);
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(userRoutes);
app.use('/listings', listingRoutes); // prepending '/listing' to every listing routes
// app.use('/pictures', picturesRoutes);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + './../client/build/index.html'))
})

app.listen(PORT);