const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },

  questionId: {
    type: Number,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;