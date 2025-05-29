const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
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
