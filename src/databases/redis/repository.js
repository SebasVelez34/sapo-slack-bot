const client = require("./config");

const disconnect = () => {
  if (client.status !== "end") return client.disconnect();
};

const connect = () => {
  if (client.status !== "ready") return client.connect();
};

const set = ({ key, data, options = [] }) => {
  return client.set(key, data, ...options);
};

const get = (key) => {
  return client.get(key);
};

const setex = ({ key, seconds, data }) => {
  return client.setex(key, seconds, data);
};

const zincrby = ({ key, increment = 1, member }) => {
  return client.zincrby(key, increment, member);
};

const zrevrange = ({ key, start = 0, stop = 0, options = [] }) => {
  return client.zrevrange(key, start, stop, ...options);
};

module.exports = { set, get, setex, disconnect, connect, zincrby, zrevrange };
