const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    type: String,
    number: Number,
    problems: [
        {
            title: String,
        }
    ],
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
