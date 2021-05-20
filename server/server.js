const express = require('express');
const expressValidator = require('express-validator');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/routes');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/", router);

mongoose.connect('mongodb://localhost:27017/addressbook', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Database connected Successfully!!");
    })
    .catch(e => {
        console.log("Not connected to the database", err);
        process.exit();
    });

let server = app.listen(3000, () => {
    console.log("server is listening on port 3000");
})