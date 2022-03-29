const mongoose = require('mongoose');

const {NOTE_APP_MONGODB_HOST, NOTE_APP_MONGODB_DATABASE } = process.env;

const MONGODB_URL = `mongodb://${NOTE_APP_MONGODB_HOST}/${NOTE_APP_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    
})
  .then(db => console.log('Base de datos Conectada'))
  .catch(err => console.log(err));