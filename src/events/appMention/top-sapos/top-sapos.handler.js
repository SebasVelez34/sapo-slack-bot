const helper = require("./top-sapos.helper");

const { APP_MENTION_PATTERNS } = require("../../../utils/regex");

const handler = async ({ event, say, client }) => {
  try {
    const { text, channel } = event;
    if (APP_MENTION_PATTERNS.TOP_SAPO_REGEX.test(text)) {
      helper.connectRedis();
      const [, top] = text.match(APP_MENTION_PATTERNS.TOP_SAPO_REGEX);

      const MORE_SAPO_KEY = `SLACK:MORE:SAPOS:${channel}`;
      const moreSapo = await helper.zRevRange({
        key: MORE_SAPO_KEY,
        stop: top - 1
      });
      helper.closeRedis();

      if (moreSapo.length > 1) {
        return await say(
          `Los más sapos perros son:\n ${moreSapo
            .map((item) => `<@${item}> :sapo-perro:`)
            .join("\n")}`
        );
      } else if (moreSapo.length === 1) {
        return await say(`El más sapo perro es <@${moreSapo[0]}> :sapo-perro:`);
      }

      return await say(`<!channel> Todos son sapos perros sin excepción :sapo-perro: `);
    }
  } catch (error) {
    return await say(`:boom: ERROR: ${error.message}`);
  }
};

module.exports = handler;
