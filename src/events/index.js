const appMentionEvent = require("./appMention");

const init = (app) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Event listener is running");
  }

  appMentionEvent(app);
};

module.exports = init;
