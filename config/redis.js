/* redis configuration setup */
const redis = require("redis");

const client = redis.createClient({ 
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: retries => Math.min(retries * 50, 1000)
  }
});

client.on("error", err => console.error("Redis Client Error", err));

client.connect()
  .then(() => console.log("Redis connected"))
  .catch(err => console.error("Redis Error:", err));

module.exports = client;
