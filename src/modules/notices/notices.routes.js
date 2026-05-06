const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const noticesController = require("./notices.controller");
const { createNoticeSchema, updateNoticeSchema } = require("./notices.schema");

const router = express.Router();

router.get("/", noticesController.list);
router.get("/:id", noticesController.getById);
router.post("/", validate(createNoticeSchema), noticesController.create);
router.patch("/:id", validate(updateNoticeSchema), noticesController.update);
router.delete("/:id", noticesController.remove);

module.exports = router;
