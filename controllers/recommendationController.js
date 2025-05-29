/**
 * Property Controller
 * Handles CRUD operations for property recommendations
 * and integrates with Redis for caching.
 */
const recommendationService = require("../services/recommendationService");
const redisClient = require("../config/redis");

exports.createRecommendation = async (req, res) => {
  try {
    const { toUserEmail, propertyId } = req.body;
    const fromUserId = req.user.email; // from token

    const recommendation = await recommendationService.createRecommendation({ fromUserId, toUserEmail, propertyId });
    // Clear cache for the user's recommendations
    await redisClient.del(`recommendations:${toUserId}`);

    res.status(201).json({ message: "Recommendation created", recommendation });
  } catch (err) {
    res.status(500).json({ message: "Failed to create recommendation", error: err.message });
  }
};

exports.getRecommendationsForUser = async (req, res) => {
  try {
    const toUserId = req.user.id; // logged-in user

    const cacheKey = `recommendations:${toUserId}`;
    // Try to get recommendations from Redis cache
    const cachedRecommendations = await redisClient.get(cacheKey);
    if (cachedRecommendations) {
      return res.status(200).json({ recommendations: JSON.parse(cachedRecommendations) });
    }
    const recommendations = await recommendationService.getRecommendationsForUser(toUserId);
    res.status(200).json({ recommendations });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recommendations", error: err.message });
  }
};
