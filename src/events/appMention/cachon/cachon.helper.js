const redis = require("../../../databases/redis/repository");
const { getRandomItem } = require("../../../utils");

const getKey = async (key) => {
  const result = await redis.get(key);
  return JSON.parse(result || '""');
};

const setKey = (key, data) => {
  return redis.set(key, JSON.stringify(data));
};

const setKeyEx = ({ key, seconds, data }) => {
  return redis.setex({ key, seconds, data: JSON.stringify(data) });
};

const closeRedis = () => {
  return redis.disconnect();
};

const connectRedis = () => {
  return redis.connect();
};

const getCachones = ({ webClient, channel }) => {
  return webClient.conversations.members({
    channel
  });
};

const getRandomCachones = (items) => {
  return getRandomItem(items);
};

module.exports = {
  getKey,
  setKey,
  setKeyEx,
  getCachones,
  getRandomCachones,
  closeRedis,
  connectRedis
};
