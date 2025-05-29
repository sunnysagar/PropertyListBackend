const express = require("express");
const router = express.Router();
const {
    getPropertyById, 
    getAllProperties, 
    createProperty, 
    updateProperty, 
    deleteProperty
} = require("../controllers/propertyController");
const authenticateUser  = require("../middlewares/authMiddleware");

router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.post("/", authenticateUser, createProperty);
router.put("/:id", authenticateUser, updateProperty);
router.delete("/:id", authenticateUser, deleteProperty);

module.exports = router;
