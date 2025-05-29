const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendationController");
const auth = require("../middlewares/authMiddleware"); // Make sure token middleware is set up

router.post("/", auth, recommendationController.createRecommendation);
router.get("/", auth, recommendationController.getRecommendationsForUser);

module.exports = router;
