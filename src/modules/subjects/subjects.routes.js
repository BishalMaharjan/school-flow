const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const subjectsController = require("./subjects.controller");
const { createSubjectSchema, updateSubjectSchema } = require("./subjects.schema");

const router = express.Router();

router.get("/", subjectsController.list);
router.get("/:id", subjectsController.getById);
router.post("/", validate(createSubjectSchema), subjectsController.create);
router.patch("/:id", validate(updateSubjectSchema), subjectsController.update);
router.delete("/:id", subjectsController.remove);

module.exports = router;
