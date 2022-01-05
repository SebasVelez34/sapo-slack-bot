const init = (app) => {
  app.message("hello", async ({ message, say }) => {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Hey there <@${message.user}>!`
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Click Me"
            },
            action_id: "button_click_hello"
          }
        }
      ],
      text: `Hey there <@${message.user}>!`
    });
  });
};

module.exports = init;
