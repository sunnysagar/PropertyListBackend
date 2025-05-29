const propertyService = require("../services/propertyService");
const redis = require("../config/redis");

exports.createProperty = async (req, res) => {
  try {
    const data = { ...req.body, createdBy: req.user.email };
    const property = await propertyService.createProperty(data);

    // Invalidate cache
    await redis.del("all_properties");

    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllProperties = async (req, res) => {
    const cacheKey = "all_properties";
  try {
     // Check Redis cache first for saved data
    const cached = await redis.get(cacheKey);
    if (cached) {
        console.log("Serving from Redis cache");  // debugging to check working status
      return res.json(JSON.parse(cached)); // Return cached data
    }
    // if not found then fetch from DB
    const properties = await propertyService.getAllProperties(req.query);

    // Save result to Redis (cache for 1 hour = 3600 seconds)
    await redis.set(cacheKey, JSON.stringify(properties), 'EX', 3600);

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

    // Invalidate cache
    await redis.del("all_properties");

    res.json(property);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    await propertyService.deleteProperty(Number(req.params.id), req.user.email);

    // Invalidate cache
    await redis.del("all_properties");

    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};
