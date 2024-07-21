const TestCase = require('../models/TestCase.js');
const mongoose = require('mongoose');

const problemDetailSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    exampleInput: { type: String, required: false },
    exampleOutput: { type: String, required: false },
    difficulty: { type: String, required: false },
    testCases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: TestCase  // Reference the correct model name 'TestCase'
    }]
});

const ProblemDetail = mongoose.model('ProblemDetail', problemDetailSchema);

module.exports = ProblemDetail;
