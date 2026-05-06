const reportsRepository = require("./reports.repository");

const schoolSummary = async (schoolId) => {
  return reportsRepository.schoolSummaryCounts(schoolId);
};

module.exports = {
  schoolSummary,
};
