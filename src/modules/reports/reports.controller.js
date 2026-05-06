const asyncHandler = require("../../shared/utils/async-handler");
const reportsService = require("./reports.service");

const summary = asyncHandler(async (req, res) => {
  const data = await reportsService.schoolSummary(req.tenant.schoolId);
  res.status(200).json({ success: true, data });
});

module.exports = {
  summary,
};
