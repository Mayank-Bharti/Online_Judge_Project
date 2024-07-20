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
            type: [Array, String],
            required: true
        },
        expectedOutput: {
            type: [Array, String],
            required: true
        },
        actualOutput: {
            type: [Array, String],
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
