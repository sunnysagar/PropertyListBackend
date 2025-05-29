/*
    * routes/index.js
    * This file serves as the main entry point for the API routes.
    * It imports and uses the individual route modules for authentication, property management, favorites, and recommendations.
*/
const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/property", require("./propertyRoutes"));
router.use("/favorites", require("./favoriteRoutes"));
router.use("/recommendations", require("./recommendationRoutes"));

module.exports = router;
