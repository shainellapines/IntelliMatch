const Job = require("../models/Job");
const Resume = require("../models/Resume");
const mongoose = require("mongoose");

exports.createJob = async (req, res) => {
  try {
    const { title, requiredSkills } = req.body;

    const job = await Job.create({ title, requiredSkills });

    res.status(201).json(job);
  } catch {
    res.status(500).json({ msg: "Error creating job" });
  }
};

exports.getMatches = async (req, res) => {
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

    const jobs = await Job.find().lean();

    const normalize = (arr) =>
      arr.map(s => s.toLowerCase().trim());

    const resumeSkills = normalize(resume.skills);

    const results = jobs.map(job => {
      const jobSkills = normalize(job.requiredSkills);

      const matched = resumeSkills.filter(skill =>
        jobSkills.includes(skill)
      );

      const missing = jobSkills.filter(skill =>
        !resumeSkills.includes(skill)
      );

      const score =
        jobSkills.length > 0
          ? (matched.length / jobSkills.length) * 100
          : 0;

      let level = "Low Match";
      if (score >= 80) level = "High Match";
      else if (score >= 50) level = "Moderate Match";

      return {
        job,
        score,
        level,
        matchedSkills: matched,
        missingSkills: missing
      };
    });

    results.sort((a, b) => b.score - a.score);

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Matching error" });
  }
};