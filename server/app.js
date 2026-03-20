const express = require('express');
const cors = require('cors');
const path = require('path');
const diaryRouter = require('./routers/diaryRouters');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/diary', diaryRouter);

module.exports = app;