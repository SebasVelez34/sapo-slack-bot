const testCommand = require("./test");

const init = (app) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Command listener is running");
  }

  testCommand(app);
};

module.exports = init;
