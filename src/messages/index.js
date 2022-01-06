const helloMessage = require("./hello");

const init = (app) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Messages listener is running");
  }

  helloMessage(app);

  app.message(":wave:", async ({ message, say }) => {
    await say(`Hello, <@${message.user}>`);
  });
};

module.exports = init;
