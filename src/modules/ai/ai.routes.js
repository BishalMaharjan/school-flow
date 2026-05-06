const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const aiController = require("./ai.controller");
const { promptSchema } = require("./ai.schema");

const router = express.Router();

router.post("/prompt", validate(promptSchema), aiController.prompt);

module.exports = router;
