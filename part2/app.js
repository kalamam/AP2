const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extendet: true}));
app.use(express.json());

const cors = require('cors');
app.use(cors());

const customEnv = requier('custom-env');
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

const users = require('./routers/User');
const tokens = require('./routers/Token');
const chats = require('./routers/Chat');
app.use('/users', users);
app.use('/tokens', tokens);
app.use('/chat', chats);

app.listen(process.env.PORT);