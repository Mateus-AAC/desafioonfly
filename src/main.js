require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const handleErrors = require('./middlewares/errorHandling');

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', authRoute);
app.use('/api', userRoute);

app.use(handleErrors.solveRoute);

module.exports = app;