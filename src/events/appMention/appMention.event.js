const cachonHandler = require("./cachon");
const moreCachonHandler = require("./more-cachon");
const { APP_MENTION_PATTERNS } = require("../../utils/regex");

const init = (app) => {
  if (process.env.NODE_ENV === "development") {
    console.log("App mention listener is running");
  }

  app.event("app_mention", async (eventData) => {
    //if (eventData.event.type === "app_mention") {
    cachonHandler(eventData);
    moreCachonHandler(eventData);

    if (
      !Object.values(APP_MENTION_PATTERNS).some((regex) =>
        regex.test(eventData.event.text)
      )
    )
      return await eventData.say(
        `Sorry <@${eventData.event.user}>, I don't know what you mean :confused:`
      );
  });
};

module.exports = init;
