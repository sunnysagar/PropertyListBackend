const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/property", require("./propertyRoutes"));
router.use("/favorites", require("./favoriteRoutes"));
router.use("/recommendations", require("./recommendationRoutes"));

module.exports = router;
