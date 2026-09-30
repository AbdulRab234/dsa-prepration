const mongoose = require("mongoose");

const solvedQuestionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  questionId: {
    type: Number,
    required: true
  }
});

const SolvedQuestion = mongoose.model(
  "SolvedQuestion",
  solvedQuestionSchema
);

module.exports = SolvedQuestion;