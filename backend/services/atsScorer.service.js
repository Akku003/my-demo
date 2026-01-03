const normalizeText = (text="") =>
  text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

const extractSkills = (text, skillSet) => {
  const normalizedText = normalizeText(text);
  return skillSet.filter(skill => normalizedText.includes(skill));
};

const calculateATSScore = (resumeText, jobDescription) => {
  const skillSet = [
    "javascript",
    "node.js",
    "express",
    "python",
    "java",
    "sql",
    "html",
    "css",
    "react",
    "mongodb",
    "machine learning",
    "data structures",
    "ocr"
  ];

  // const resumeSkills = extractSkills(resumeText, skillSet);
  // const jdSkills = extractSkills(jobDescription, skillSet);

//   const matchedSkills = resumeSkills.filter(skill =>
//     jdSkills.includes(skill)
//   );

//   const score = jdSkills.length
//     ? Math.round((matchedSkills.length / jdSkills.length) * 100)
//     : 0;

//   return {
//     atsScore: score,
//     matchedSkills,
//     missingSkills: jdSkills.filter(skill => !matchedSkills.includes(skill))
//   };
// };
const matchedSkills = extractSkills(resumeText, skillSet);
const score = Math.min(
    100,
    Math.round((matchedSkills.length / skillSet.length) * 100)
  );

  return {
    atsScore: score,
    matchedSkills,
    missingSkills: skillSet.filter(
      skill => !matchedSkills.includes(skill)
    )
  };
};

module.exports = { calculateATSScore };
