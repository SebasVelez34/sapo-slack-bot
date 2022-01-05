const helloAction = require("./hello");

const init = (app) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Action listener is running");
  }

  helloAction(app);
};

module.exports = init;
