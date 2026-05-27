const Resume = require("../models/Resume");
const { analyzeResume } = require("../services/aiService");
const mongoose = require("mongoose");

// CREATE RESUME
exports.createResume = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ msg: "Valid resume text is required" });
    }

    if (text.length > 5000) {
      return res.status(400).json({ msg: "Resume too long" });
    }

    const aiData = await analyzeResume(text);

    let score = 0;
    score += aiData.skills.length * 15;

    if (text.length > 150) score += 20;
    if (aiData.issues.length === 0) score += 10;

    if (score > 100) score = 100;

    const resume = await Resume.create({
      userId: req.user.id,
      text,
      skills: aiData.skills,
      score,
    });

    res.status(201).json({ resume, ai: aiData });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error while creating resume" });
  }
};

// GET RESUMES (WITH PAGINATION META)
exports.getResumes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const total = await Resume.countDocuments({ userId: req.user.id });

    const resumes = await Resume.find({ userId: req.user.id })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      data: resumes,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });

  } catch (err) {
    res.status(500).json({ msg: "Error fetching resumes" });
  }
};

// UPDATE RESUME (🔥 FIXED AI + VALIDATION)
exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }

    if (!text || typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ msg: "Invalid input" });
    }

    if (text.length > 5000) {
      return res.status(400).json({ msg: "Resume too long" });
    }

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ msg: "Resume not found" });
    }

    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    // 🔥 RE-RUN AI
    const aiData = await analyzeResume(text);

    let score = 0;
    score += aiData.skills.length * 15;
    if (text.length > 150) score += 20;
    if (aiData.issues.length === 0) score += 10;

    if (score > 100) score = 100;

    resume.text = text;
    resume.skills = aiData.skills;
    resume.score = score;

    await resume.save();

    res.json({ resume, ai: aiData });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating resume" });
  }
};

// DELETE RESUME
exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ msg: "Resume not found" });
    }

    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await resume.deleteOne();

    res.json({ msg: "Resume deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Error deleting resume" });
  }
};