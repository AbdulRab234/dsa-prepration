const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
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

const Bookmark = mongoose.model(
  "Bookmark",
  bookmarkSchema
);

module.exports = Bookmark;