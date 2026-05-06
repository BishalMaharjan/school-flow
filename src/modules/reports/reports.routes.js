const express = require("express");
const reportsController = require("./reports.controller");

const router = express.Router();

router.get("/summary", reportsController.summary);

module.exports = router;
