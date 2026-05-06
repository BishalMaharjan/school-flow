const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const assignmentsController = require("./assignments.controller");
const { createAssignmentSchema, updateAssignmentSchema } = require("./assignments.schema");

const router = express.Router();

router.get("/", assignmentsController.list);
router.get("/:id", assignmentsController.getById);
router.post("/", validate(createAssignmentSchema), assignmentsController.create);
router.patch("/:id", validate(updateAssignmentSchema), assignmentsController.update);
router.delete("/:id", assignmentsController.remove);

module.exports = router;
