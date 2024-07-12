const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  Company_name: { type: String, required: true },
  Company_email: { type: String, required: true },
  register_start_date: { type: String, required: true },
  register_end_date: { type: String, required: true },
  contest_start_date: { type: String, required: true },
  contest_end_date: { type: String, required: true }
});

const Contest = mongoose.model('Contest', contestSchema);

module.exports = Contest ;
