const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const sectionsController = require("./sections.controller");
const { createSectionSchema, updateSectionSchema } = require("./sections.schema");

const router = express.Router();

router.get("/", sectionsController.list);
router.get("/:id", sectionsController.getById);
router.post("/", validate(createSectionSchema), sectionsController.create);
router.patch("/:id", validate(updateSectionSchema), sectionsController.update);
router.delete("/:id", sectionsController.remove);

module.exports = router;
