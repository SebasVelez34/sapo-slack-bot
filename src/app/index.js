const { SLACK_SIGNING_SECRET, SLACK_BOT_TOKEN, SLACK_APP_TOKEN } = process.env;

const { App, ExpressReceiver } = require("@slack/bolt");

const receiver = new ExpressReceiver({ signingSecret: SLACK_SIGNING_SECRET });

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode: false,
  appToken: SLACK_APP_TOKEN,
  receiver
  //...(NODE_ENV === "development" && { logLevel: LogLevel.DEBUG })
});

console.log("Hooooooooooooooola",receiver.app.route);

receiver.router.post("/slack/events", (req, res) => {
  console.log(req);

  // You're working with an express req and res now.
  res.send("yay!");
});

module.exports = app;
