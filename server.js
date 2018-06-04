const express = require('express');

const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express();

//db config
const db = require('./config/keys').mongoURI;

//connect to mongoDB
mongoose.connect(db)
.then(() => console.log('we are connected to DB at mLab'))
.catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World. we are connected'));

//use routs
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`));
