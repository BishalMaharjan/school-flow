const asyncHandler = require("../../shared/utils/async-handler");
const attendanceService = require("./attendance.service");

const list = asyncHandler(async (req, res) => {
  const rows = await attendanceService.list(req.tenant.schoolId, req.query);
  res.status(200).json({ success: true, data: rows });
});

const getById = asyncHandler(async (req, res) => {
  const row = await attendanceService.getById(req.tenant.schoolId, req.params.id);
  res.status(200).json({ success: true, data: row });
});

const create = asyncHandler(async (req, res) => {
  const row = await attendanceService.create(req.tenant.schoolId, req.body, req.user.id);
  res.status(201).json({ success: true, data: row });
});

const update = asyncHandler(async (req, res) => {
  const row = await attendanceService.update(req.tenant.schoolId, req.params.id, req.body);
  res.status(200).json({ success: true, data: row });
});

const remove = asyncHandler(async (req, res) => {
  await attendanceService.remove(req.tenant.schoolId, req.params.id);
  res.status(204).send();
});

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
