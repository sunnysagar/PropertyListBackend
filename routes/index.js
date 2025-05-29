const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/property", require("./propertyRoutes"))

module.exports = router;
