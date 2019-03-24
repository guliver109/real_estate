const   express = require('express'),
        cookieParser = require('cookie-parser'),
        app = express(),
        PORT = process.env.PORT || 3001,
        userRoutes = require('./routes/user'),
        listingRoutes = require('./routes/listing');


require('./config/connection'); // connection to data base 

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser());

require('./config/session')(app);

app.use(userRoutes);
app.use('/listings', listingRoutes); // prepending '/listing' to every listing routes


app.listen(PORT);