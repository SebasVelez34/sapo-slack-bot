const Redis = require("ioredis");

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  REDIS_DEV_HOST,
  REDIS_DEV_PORT,
  NODE_ENV
} = process.env;

let client = null;
const redisConfig = {
  host: REDIS_HOST,
  port: Number.parseInt(REDIS_PORT),
  password: REDIS_PASSWORD
};
const redisDevConfig = {
  host: REDIS_DEV_HOST,
  port: Number.parseInt(REDIS_DEV_PORT)
};

if (client === null) {
  client = new Redis(
    NODE_ENV.toLowerCase() !== "development" ? redisConfig : redisDevConfig
  );
}

client.on("error", function (error) {
  console.error({ error });
});

client.on("connect", function () {
  if (NODE_ENV === "development") console.log("Connected to redis");
});

client.on("close", function () {
  if (NODE_ENV === "development") console.log("Redis closed");
});

module.exports = client;
