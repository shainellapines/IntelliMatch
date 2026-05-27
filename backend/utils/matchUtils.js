exports.matchScore = (resumeSkills, jobSkills) => {
  const match = resumeSkills.filter(skill =>
    jobSkills.includes(skill)
  );

  return (match.length / jobSkills.length) * 100;
};