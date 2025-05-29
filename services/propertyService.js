/*
 * Property Service
 * Handles Business logic of CRUD operations for properties
 * and integrates with the Property model.
 */
const Property = require("../models/Property");

exports.createProperty = async (data) => {
  const property = new Property(data);
  return await property.save();
};

exports.getAllProperties = async (filters = {}) => {
  return await Property.find(filters);
};

exports.getPropertyById = async (id) => {
    return await Property.findOne({ id: Number(id) });
};

exports.updateProperty = async (id, userId, updateData) => {
    const property = await Property.findOne({ id: Number(id) });
    if (!property) throw new Error("Property not found");
    if (property.createdBy.toString() !== userId) throw new Error("Unauthorized");

    Object.assign(property, updateData);
    return await property.save();
};

exports.deleteProperty = async (id, userId) => {
    const property = await Property.findOne({ id: Number(id) });
    if (!property) throw new Error("Property not found");
    if (property.createdBy.toString() !== userId) throw new Error("Unauthorized");

    return await Property.deleteOne({ id: Number(id) });
};
