const Favorite = require("../models/Favorite");

exports.addFavorite = async (userId, propertyId) => {
  // Check if already favorite to avoid duplicates
  const existing = await Favorite.findOne({ userId, propertyId });
  if (existing) return existing;

  const favorite = new Favorite({ userId, propertyId });
  return favorite.save();
};

exports.removeFavorite = async (userId, propertyId) => {
  return Favorite.findOneAndDelete({ userId, propertyId });
};

exports.getUserFavorites = async (userId) => {
  return Favorite.find({ userId }).populate("propertyId");
};
