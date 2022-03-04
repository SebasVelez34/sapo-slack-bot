const redis = require("../../../databases/redis/repository");

const closeRedis = () => {
  return redis.disconnect();
};

const connectRedis = () => {
  return redis.connect();
};

const zRevRange = ({ key, start, stop, options }) => {
  return redis.zrevrange({ key, start, stop, options });
};

module.exports = {
  closeRedis,
  connectRedis,
  zRevRange
};
