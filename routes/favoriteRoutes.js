const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const auth = require("../middlewares/authMiddleware"); // your auth middleware

router.post("/add", auth, favoriteController.addFavorite);
router.post("/remove", auth, favoriteController.removeFavorite);
router.get("/list", auth, favoriteController.getUserFavorites);

module.exports = router;
