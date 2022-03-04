const redis = require("../../../databases/redis/repository");
const { getRandomItem } = require("../../../utils");

const getKey = async (key) => {
  const result = await redis.get(key);
  return JSON.parse(result || '""');
};

const setKey = ({ key, data, options }) => {
  return redis.set({ key, data: JSON.stringify(data), options });
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

const getSapos = ({ client, channel }) => {
  return client.conversations.members({
    channel
  });
};

const getUserInfo = ({ client, userId }) => {
  return client.users.info({ user: userId });
};

const getRandomSapos = (items) => {
  return getRandomItem(items);
};

const incrementSapoScore = ({ key, increment, member }) => {
  return redis.zincrby({ key, increment, member });
};

module.exports = {
  getKey,
  setKey,
  setKeyEx,
  getSapos,
  getRandomSapos,
  closeRedis,
  connectRedis,
  incrementSapoScore,
  getUserInfo
};
