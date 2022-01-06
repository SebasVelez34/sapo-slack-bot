const redis = require("../../../databases/redis/repository");

const closeRedis = () => {
  return redis.disconnect();
};

const connectRedis = () => {
  return redis.connect();
};

const zRevRange = ({ key, start, stop, withscores }) => {
  return redis.zrevrange({ key, start, stop, withscores });
};

module.exports = {
  closeRedis,
  connectRedis,
  zRevRange
};
