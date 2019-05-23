const config = require('./config/config.js');
const mongoose = require ('mongoose');

mongoose.connect(global.gConfig.database_uri)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;