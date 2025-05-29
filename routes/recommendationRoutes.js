const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendationController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, recommendationController.createRecommendation);
router.get("/", auth, recommendationController.getRecommendationsForUser);

module.exports = router;
