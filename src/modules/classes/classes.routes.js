const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const classesController = require("./classes.controller");
const { createClassSchema, updateClassSchema } = require("./classes.schema");

const router = express.Router();

router.get("/", classesController.list);
router.get("/:id", classesController.getById);
router.post("/", validate(createClassSchema), classesController.create);
router.patch("/:id", validate(updateClassSchema), classesController.update);
router.delete("/:id", classesController.remove);

module.exports = router;
