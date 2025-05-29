/**
 * Recommendation Service
 * Handles business logic for property recommendations
 * and integrates with the Recommendation model.
 * This service provides functions to create and retrieve recommendations.
 */
const Recommendation = require("../models/Recommendation");

exports.createRecommendation = async ({ fromUserId, toUserEmail, propertyId }) => {
  const recommendation = new Recommendation({ fromUserId, toUserEmail, propertyId });
  return await recommendation.save();
};

exports.getRecommendationsForUser = async (toUserEmail) => {
 const recommendations = await Recommendation.find({ toUserEmail })
    .populate("fromUserId", "email")
    .populate("propertyId", "title price location");
  return recommendations || [];
};
