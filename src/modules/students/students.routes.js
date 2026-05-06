const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const studentsController = require("./students.controller");
const { createStudentSchema, updateStudentSchema } = require("./students.schema");

const router = express.Router();

router.get("/", studentsController.list);
router.get("/:id", studentsController.getById);
router.post("/", validate(createStudentSchema), studentsController.create);
router.patch("/:id", validate(updateStudentSchema), studentsController.update);
router.delete("/:id", studentsController.remove);

module.exports = router;
