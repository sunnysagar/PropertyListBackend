const recommendationService = require("../services/recommendationService");

exports.createRecommendation = async (req, res) => {
  try {
    const { toUserEmail, propertyId } = req.body;
    const fromUserId = req.user.email; // from token

    const recommendation = await recommendationService.createRecommendation({ fromUserId, toUserEmail, propertyId });
    res.status(201).json({ message: "Recommendation created", recommendation });
  } catch (err) {
    res.status(500).json({ message: "Failed to create recommendation", error: err.message });
  }
};

exports.getRecommendationsForUser = async (req, res) => {
  try {
    const toUserId = req.user.id; // logged-in user

    const recommendations = await recommendationService.getRecommendationsForUser(toUserId);
    res.status(200).json({ recommendations });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recommendations", error: err.message });
  }
};
