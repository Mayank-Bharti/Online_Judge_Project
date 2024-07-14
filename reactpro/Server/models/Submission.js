const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProblemDetail',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    verdict: {
        type: String,
        enum: ['Accepted', 'Wrong Answer'],
        required: true
    },
    testCaseResults: [{
        input: {
            type: String,
            required: true  // Set this to `false` if you want to make `input` optional
        },
        expectedOutput: {
            type: String,
            required: true
        },
        actualOutput: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true
        }
    }]
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
