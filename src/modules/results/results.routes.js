const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const resultsController = require("./results.controller");
const { createResultSchema, updateResultSchema } = require("./results.schema");

const router = express.Router();

router.get("/", resultsController.list);
router.get("/:id", resultsController.getById);
router.post("/", validate(createResultSchema), resultsController.create);
router.patch("/:id", validate(updateResultSchema), resultsController.update);
router.delete("/:id", resultsController.remove);

module.exports = router;
