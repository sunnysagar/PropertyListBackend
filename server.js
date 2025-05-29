const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(require("cors")());
app.use("/api", require("./routes"));

app.get("/", (req, res) => res.send("Property Listing Backend"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));