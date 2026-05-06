const asyncHandler = require("../../shared/utils/async-handler");
const invoicesService = require("./invoices.service");

const list = asyncHandler(async (req, res) => {
  const rows = await invoicesService.list(req.tenant.schoolId, req.query);
  res.status(200).json({ success: true, data: rows });
});

const getById = asyncHandler(async (req, res) => {
  const row = await invoicesService.getById(req.tenant.schoolId, req.params.id);
  res.status(200).json({ success: true, data: row });
});

const create = asyncHandler(async (req, res) => {
  const row = await invoicesService.create(req.tenant.schoolId, req.body);
  res.status(201).json({ success: true, data: row });
});

const update = asyncHandler(async (req, res) => {
  const row = await invoicesService.update(req.tenant.schoolId, req.params.id, req.body);
  res.status(200).json({ success: true, data: row });
});

const remove = asyncHandler(async (req, res) => {
  await invoicesService.remove(req.tenant.schoolId, req.params.id);
  res.status(204).send();
});

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
