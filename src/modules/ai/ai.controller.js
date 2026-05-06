const asyncHandler = require("../../shared/utils/async-handler");
const aiService = require("./ai.service");

const prompt = asyncHandler(async (req, res) => {
  const data = await aiService.ask(req.body);
  res.status(200).json({ success: true, data });
});

module.exports = {
  prompt,
};
