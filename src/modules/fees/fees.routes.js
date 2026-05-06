const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const feesController = require("./fees.controller");
const { createFeeSchema, updateFeeSchema } = require("./fees.schema");

const router = express.Router();

router.get("/", feesController.list);
router.get("/:id", feesController.getById);
router.post("/", validate(createFeeSchema), feesController.create);
router.patch("/:id", validate(updateFeeSchema), feesController.update);
router.delete("/:id", feesController.remove);

module.exports = router;
