const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const tenantMiddleware = require("../middlewares/tenant.middleware");
const authRoutes = require("./auth/auth.routes");
const schoolsRoutes = require("./schools/schools.routes");
const classesRoutes = require("./classes/classes.routes");
const sectionsRoutes = require("./sections/sections.routes");
const subjectsRoutes = require("./subjects/subjects.routes");
const assignmentsRoutes = require("./assignments/assignments.routes");
const studentsRoutes = require("./students/students.routes");
const teachersRoutes = require("./teachers/teachers.routes");
const attendanceRoutes = require("./attendance/attendance.routes");
const examsRoutes = require("./exams/exams.routes");
const resultsRoutes = require("./results/results.routes");
const feesRoutes = require("./fees/fees.routes");
const invoicesRoutes = require("./invoices/invoices.routes");
const noticesRoutes = require("./notices/notices.routes");
const reportsRoutes = require("./reports/reports.routes");
const aiRoutes = require("./ai/ai.routes");

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/schools", authMiddleware, tenantMiddleware, schoolsRoutes);
router.use("/classes", authMiddleware, tenantMiddleware, classesRoutes);
router.use("/sections", authMiddleware, tenantMiddleware, sectionsRoutes);
router.use("/subjects", authMiddleware, tenantMiddleware, subjectsRoutes);
router.use("/assignments", authMiddleware, tenantMiddleware, assignmentsRoutes);
router.use("/students", authMiddleware, tenantMiddleware, studentsRoutes);
router.use("/teachers", authMiddleware, tenantMiddleware, teachersRoutes);
router.use("/attendance", authMiddleware, tenantMiddleware, attendanceRoutes);
router.use("/exams", authMiddleware, tenantMiddleware, examsRoutes);
router.use("/results", authMiddleware, tenantMiddleware, resultsRoutes);
router.use("/fees", authMiddleware, tenantMiddleware, feesRoutes);
router.use("/invoices", authMiddleware, tenantMiddleware, invoicesRoutes);
router.use("/notices", authMiddleware, tenantMiddleware, noticesRoutes);
router.use("/reports", authMiddleware, tenantMiddleware, reportsRoutes);
router.use("/ai", authMiddleware, tenantMiddleware, aiRoutes);

module.exports = router;
