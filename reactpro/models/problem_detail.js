const mongoose = require('mongoose');

const problemDetailSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  exampleInput: { type: String, required: false },
  exampleOutput: { type: String, required: false },
  difficulty: { type: String, required: false },
  compiler: { type: String, required: true }
});

const ProblemDetail = mongoose.model('ProblemDetail', problemDetailSchema);

module.exports = ProblemDetail;
