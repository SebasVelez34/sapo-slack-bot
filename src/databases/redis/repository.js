const client = require("./config");

const set = (key, data) => {
  return client.set(key, data);
};

const get = (key) => {
  return client.get(key);
};

const setex = ({ key, seconds, data }) => {
  return client.setex(key, seconds, data);
};

const disconnect = () => {
  if (client.status !== "end") return client.disconnect();
};

const connect = () => {
  if (client.status !== "ready") return client.connect();
};

module.exports = { set, get, setex, disconnect, connect };
