const mongoose = require("mongoose");

const mockTestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  score: {
    type: Number,
    required: true
  },

  totalQuestions: {
    type: Number,
    required: true
  },

  percentage: {
    type: Number,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

const MockTest = mongoose.model("MockTest", mockTestSchema);

module.exports = MockTest;