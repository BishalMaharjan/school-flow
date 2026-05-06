const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const schoolsController = require("./schools.controller");
const { updateSchoolSchema } = require("./schools.schema");

const router = express.Router();

router.get("/", schoolsController.list);
router.get("/:id", schoolsController.getById);
router.patch("/:id", validate(updateSchoolSchema), schoolsController.update);

module.exports = router;
