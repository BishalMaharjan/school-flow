const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const invoicesController = require("./invoices.controller");
const { createInvoiceSchema, updateInvoiceSchema } = require("./invoices.schema");

const router = express.Router();

router.get("/", invoicesController.list);
router.get("/:id", invoicesController.getById);
router.post("/", validate(createInvoiceSchema), invoicesController.create);
router.patch("/:id", validate(updateInvoiceSchema), invoicesController.update);
router.delete("/:id", invoicesController.remove);

module.exports = router;
