/**
 * Recommendation Model
 * Represents a recommendation made by one user to another for a property.
 */
const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
  fromUserId: { type: String, ref: "User" },
  toUserEmail: { type: String, ref: "User" },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" }
});

module.exports = mongoose.model("Recommendation", recommendationSchema);
