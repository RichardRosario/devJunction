const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//db config
const db = require('./config/keys').mongoURI;

//connect to mongoDB
mongoose.connect(db)
.then(() => console.log('we are connected to DB at mLab'))
.catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//password config
require('./config/passport')(passport);

//use routs
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//server static assets if in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`));
