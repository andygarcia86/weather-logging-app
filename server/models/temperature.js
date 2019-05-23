const mongoose = require('mongoose');
const { Schema } = mongoose;

const TemperatureSchema = new Schema ({
    dateLogged: { type: Date, require: true, default: Date.now },
    value: { type: Number, require: true }
});

module.exports = mongoose.model('Temperature', TemperatureSchema);

