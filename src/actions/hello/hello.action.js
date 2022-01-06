const init = (app) => {
  app.action("button_click_hello", async (data) => {
    await ack();

    if (say) return await say(`<@${body.user.id}> clicked the button (say)`);

    if (respond)
      return await respond(`<@${body.user.id}> clicked the button (respond)`);

    return await webClient.chat.postMessage({
      channel: channel.id,
      text: `<@${body.user.id}> clicked the button (webClient)`
    });
  });
};

module.exports = init;
