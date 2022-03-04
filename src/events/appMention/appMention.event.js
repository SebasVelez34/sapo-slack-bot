const { APP_MENTION_PATTERNS } = require("../../utils/regex");

const sapoHandler = require("./sapo");
const moreSapoHandler = require("./more-sapo");
const topSapoHandler = require("./top-sapos");

const init = (app) => {
  if (process.env.NODE_ENV === "development") {
    console.log("App mention listener is running");
  }

  app.event("app_mention", async (eventData) => {
    sapoHandler(eventData);
    moreSapoHandler(eventData);
    topSapoHandler(eventData);

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
