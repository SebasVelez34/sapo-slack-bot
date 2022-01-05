require("dotenv").config();
const app = require("./src/app");
const messagesInit = require("./src/messages");
const eventsInit = require("./src/events");
const actionsInit = require("./src/actions");
const commandsInit = require("./src/commands");

const { PORT, NODE_ENV } = process.env;
const port = PORT || 3000;

messagesInit(app);
eventsInit(app);
actionsInit(app);
commandsInit(app);

(async () => {
  await app.start(port);

  if (NODE_ENV === "development") {
    console.log(`F.R.I.D.A.Y bot is running on port ${port}!`);
  }
})();
