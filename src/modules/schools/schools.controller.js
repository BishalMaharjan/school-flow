const asyncHandler = require("../../shared/utils/async-handler");
const schoolsService = require("./schools.service");

const list = asyncHandler(async (req, res) => {
  const rows = await schoolsService.list(req.tenant.schoolId);
  res.status(200).json({ success: true, data: rows });
});

const getById = asyncHandler(async (req, res) => {
  const row = await schoolsService.getById(req.tenant.schoolId, req.params.id);
  res.status(200).json({ success: true, data: row });
});

const update = asyncHandler(async (req, res) => {
  const row = await schoolsService.update(req.tenant.schoolId, req.params.id, req.body);
  res.status(200).json({ success: true, data: row });
});

module.exports = {
  list,
  getById,
  update,
};
