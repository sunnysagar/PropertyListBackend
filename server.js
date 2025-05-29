const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const redisClient = require("./config/redis");

console.log("REDIS_URL:", process.env.REDIS_URL);


const app = express();
connectDB();

app.use(express.json());
app.use(require("cors")());
app.use("/api", require("./routes/index"));

app.get("/", (req, res) => res.send("Property Listing Backend"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// log to know status:
redisClient.on('connect', () => console.log("Redis connected"));
redisClient.on('error', (err) => console.error("Redis Client Error", err));