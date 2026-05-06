const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const attendanceController = require("./attendance.controller");
const { createAttendanceSchema, updateAttendanceSchema } = require("./attendance.schema");

const router = express.Router();

router.get("/", attendanceController.list);
router.get("/:id", attendanceController.getById);
router.post("/", validate(createAttendanceSchema), attendanceController.create);
router.patch("/:id", validate(updateAttendanceSchema), attendanceController.update);
router.delete("/:id", attendanceController.remove);

module.exports = router;
