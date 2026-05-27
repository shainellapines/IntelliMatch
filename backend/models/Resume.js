const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    index: true // 🔥 improves search performance
  }],
  experience: [String],
  education: [String],
  score: Number
}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);