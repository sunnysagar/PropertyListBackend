const propertyService = require("../services/propertyService");

exports.createProperty = async (req, res) => {
  try {
    const data = { ...req.body, createdBy: req.user.email };
    const property = await propertyService.createProperty(data);
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await propertyService.getAllProperties(req.query);
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await propertyService.getPropertyById(Number(req.params.id));
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await propertyService.updateProperty(Number(req.params.id), req.user.email, req.body);
    res.json(property);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    await propertyService.deleteProperty(Number(req.params.id), req.user.email);
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};
