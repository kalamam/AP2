const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extendet: true}));
app.use(express.json());

const cors = require('cors');
app.use(cors());

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING)
console.log(process.env.PORT)

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
app.use(express.static('public'))

const users = require('./routes/User');
const tokens = require('./routes/Token');
const chats = require('./routes/Chat');
app.use('/api/User', users);
app.use('/api/Token', tokens);
app.use('/api/Chat', chats);

app.listen(process.env.PORT);