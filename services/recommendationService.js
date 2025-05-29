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
