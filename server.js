require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001

const router = require('./routes/');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/c18', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

app.use(router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}.`);
});