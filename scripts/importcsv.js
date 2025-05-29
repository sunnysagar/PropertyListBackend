const csv = require("csvtojson");
const dotenv = require("dotenv");
const Property = require("../models/Property")
const User = require("../models/User");
const connectDB = require("../config/db");

dotenv.config();
// mongoose.connect(process.env.MONGODB_URI);

 const importCSV = async() => {
  try {
    await connectDB();
    const users = await User.find({});
    const userMap = {};

    // Create a quick map of userType to user document
    users.forEach(user => {
      userMap[user.userType.toLowerCase()] = user;  // convert to lowercase for safe matching
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

      return {
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
        createdBy: user.email
      };
    }).filter(Boolean);  // remove nulls

    await Property.insertMany(processedData);
    console.log("Imported properties with createdBy assigned.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importCSV()
