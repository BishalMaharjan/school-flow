const asyncHandler = require("../../shared/utils/async-handler");
const authService = require("./auth.service");

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  res.status(200).json({ success: true, data: result });
});

const register = asyncHandler(async (req, res) => {
  const result = await authService.registerSchool(req.body);
  res.status(201).json({ success: true, data: result });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const result = await authService.forgotPassword(req.body.email);
  res.status(200).json({ success: true, data: result });
});

const resetPassword = asyncHandler(async (req, res) => {
  const result = await authService.resetPassword(req.body);
  res.status(200).json({ success: true, data: result });
});

module.exports = {
  login,
  register,esetPasswo