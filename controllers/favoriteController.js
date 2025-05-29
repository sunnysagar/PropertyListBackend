/* Handle the fav property
  1. Add a property to favorites
  2. Remove a property from favorites
  3. Get all favorites for a user
 */

const favoriteService = require("../services/favoriteService");
const redisClient = require("../config/redis"); // Make sure you have a redis client utility

exports.addFavorite = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const userId = req.user.id; // get from authenticated user
    const favorite = await favoriteService.addFavorite(userId, propertyId);
    await redisClient.del(`favorites:${userId}`); // Clear cache for this user's favorites
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
    await redisClient.del(`favorites:${userId}`); // Clear cache for this user's favorites
    res.json({ message: "Favorite removed" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const cacheKey = `user:${userId}:favorites`;

    // Try to get favorites from Redis cache
    const cachedFavorites = await redisClient.get(cacheKey);
    if (cachedFavorites) {
      return res.json(JSON.parse(cachedFavorites));
    }

    // If not cached, fetch from DB/service
    const favorites = await favoriteService.getUserFavorites(userId);

    // Cache the result in Redis for future requests
    await redisClient.set(cacheKey, JSON.stringify(favorites), { EX: 3600 }); // cache for 1 hour

    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
