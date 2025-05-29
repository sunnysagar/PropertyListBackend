/**
 * Property schema for MongoDB using Mongoose
 * Defines the structure of property documents
 * and includes fields for access control.
 */
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String },
  price: { type: Number },
  state: { type: String },
  city: { type: String },
  areaSqFt: { type: Number },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  amenities: [String],
  furnished: { type: String },
  availableFrom: { type: Date },
  listedBy: { type: String },
  tags: [String],
  colorTheme: { type: String },
  rating: { type: Number },
  isVerified: { type: Boolean },
  listingType: { type: String },

  // Important field for access control
  createdBy: {
    type: String,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
