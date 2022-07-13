const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    '_id': {
        type: String,
        required: true
    },
    'useremail': {
        type: String,
        required: true,
    },
    'imagename': [String]
});

module.exports = mongoose.model('imageHistory', historySchema);