const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const teachersController = require("./teachers.controller");
const { createTeacherSchema, updateTeacherSchema } = require("./teachers.schema");

const router = express.Router();

router.get("/", teachersController.list);
router.get("/:id", teachersController.getById);
router.post("/", validate(createTeacherSchema), teachersController.create);
router.patch("/:id", validate(updateTeacherSchema), teachersController.update);
router.delete("/:id", teachersController.remove);

module.exports = router;
