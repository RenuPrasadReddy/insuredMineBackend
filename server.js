const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const port = 5001;


//URI is taken off


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => console.log('connected to db'));


const fileUploadRouter = require('./routes/fileUpload')
app.use('/upload', fileUploadRouter)

const searchRouter = require('./routes/search')
app.use('/search', searchRouter);

const saveMessageRouter = require('./routes/message')
app.use('/saveMessage', saveMessageRouter);

module.exports = {}

app.listen(port, () => console.log("server listening to port:", port))