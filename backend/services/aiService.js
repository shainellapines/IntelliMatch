exports.analyzeResume = async (text) => {
  const skillsList = [
    "javascript", "react", "node", "mongodb",
    "python", "java", "html", "css", "git"
  ];

  const words = text.toLowerCase().split(/\W+/);

  const skills = skillsList.filter(skill => words.includes(skill));

  const issues = [];
  const suggestions = [];

  // SKILL ANALYSIS
  if (skills.length === 0) {
    issues.push("No technical skills detected");
  } else if (skills.length < 4) {
    issues.push("Limited technical skills detected");
  }

  // LENGTH CHECK
  if (text.length < 150) {
    issues.push("Resume content is too short");
  }

  // CONTENT CHECKS
  if (!words.includes("project")) {
    issues.push("No project experience found");
  }

  if (!words.includes("experience")) {
    issues.push("No work experience mentioned");
  }

  //SUGGESTIONS
  if (!words.includes("achievement")) {
    suggestions.push("Include measurable achievements");
  }

  if (!words.includes("team")) {
    suggestions.push("Highlight teamwork or collaboration");
  }

  if (!words.includes("developed")) {
    suggestions.push("Use action verbs like 'developed', 'built', or 'implemented'");
  }

  return {
    skills,
    issues,
    suggestions
  };
};