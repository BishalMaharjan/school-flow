const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const examsController = require("./exams.controller");
const { createExamSchema, updateExamSchema } = require("./exams.schema");

const router = express.Router();

router.get("/", examsController.list);
router.get("/:id", examsController.getById);
router.post("/", validate(createExamSchema), examsController.create);
router.patch("/:id", validate(updateExamSchema), examsController.update);
router.delete("/:id", examsController.remove);

module.exports = router;
