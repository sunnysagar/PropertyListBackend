const favoriteService = require("../services/favoriteService");

exports.addFavorite = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const userId = req.user.id; // get from authenticated user
    const favorite = await favoriteService.addFavorite(userId, propertyId);
    res.status(201).json(favorite);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const userId = req.user._id;
    await favoriteService.removeFavorite(userId, propertyId);
    res.json({ message: "Favorite removed" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const favorites = await favoriteService.getUserFavorites(userId);
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
