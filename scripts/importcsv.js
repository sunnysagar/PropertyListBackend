/**
 * Import CSV data into MongoDB with auto-incremented IDs and createdBy field
 * This script reads a CSV file, processes the data, and inserts it into the Property collection.
 * It also assigns the createdBy field based on the listedBy userType 
   and auto-increments the id field.
 */

const csv = require("csvtojson");
const dotenv = require("dotenv");
const Property = require("../models/Property")
const User = require("../models/User");
const connectDB = require("../config/db");

dotenv.config();

const importCSV = async () => {
  try {
    await connectDB();
    const users = await User.find({});
    const userMap = {};

    // Create a quick map of userType to user document (only for Owner, Builder, Agent)
    users.forEach(user => {
      const type = user.userType ? user.userType.toLowerCase() : null;
      if (type && ["owner", "builder", "agent"].includes(type)) {
      userMap[type] = user; // map only valid userTypes
      }
    });

    let csvData = await csv().fromFile("./data/dataset.csv");  
    // slice the csvdata to save 100 data from the csv file for testing
    csvData = csvData.slice(0, 100);


    const processedData = csvData.map(item => {
      const listedBy = item.listedBy.toLowerCase();
      const user = userMap[listedBy];  // match the listedBy and userType to assign to created By

      if (!user) {
        console.warn(`No matching user for listedBy: ${listedBy}`);
        return null; // skip or handle fallback
      }

      // Assign auto-incremented id
      const property = {
        id: item.id,
        title: item.title,
        type: item.type,
        price: parseFloat(item.price),
        state: item.state,
        city: item.city,
        areaSqFt: parseFloat(item.areaSqFt),
        bedrooms: parseInt(item.bedrooms),
        bathrooms: parseInt(item.bathrooms),
        amenities: item.amenities?.split(",").map(a => a.trim()),
        furnished: item.furnished,
        availableFrom: new Date(item.availableFrom),
        listedBy: item.listedBy,
        tags: item.tags?.split(",").map(t => t.trim()),
        colorTheme: item.colorTheme,
        rating: parseFloat(item.rating),
        isVerified: item.isVerified?.toLowerCase() === "true",
        listingType: item.listingType,
        createdBy: user.email,
      };
      return property;
    }).filter(Boolean);  // remove nulls

    await Property.insertMany(processedData);
    console.log("Imported properties with createdBy assigned and auto-incremented id.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importCSV()
