/*
 * Favorite Routes
 * This module defines the routes for handling user favorites.
 * It includes routes for adding, removing, and listing favorites. 
 * It uses redis for caching favorite lists and an authentication middleware for access control.
 */
const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const auth = require("../middlewares/authMiddleware"); // your auth middleware

router.post("/add", auth, favoriteController.addFavorite);
router.post("/remove", auth, favoriteController.removeFavorite);
router.get("/list", auth, favoriteController.getUserFavorites);

module.exports = router;
