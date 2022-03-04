const { APP_MENTION_PATTERNS } = require("../../utils/regex");
const { CONSTANTS } = require("../../utils/constants");

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
    console.log("eventData.event.user",eventData.event.user);
    if (
      !Object.values(APP_MENTION_PATTERNS).some((regex) =>
        regex.test(eventData.event.text)
      )
    ){
      return await eventData.say(
        `<@${eventData.event.user}> Eres tan sapo :frog: y tan cachón :cachon: que no logré entenderte. Copia bien cabeza de M@.`
      );
    }
  
      
  });
};

module.exports = init;
