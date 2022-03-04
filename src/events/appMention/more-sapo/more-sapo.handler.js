const helper = require("./more-sapo.helper");

const { APP_MENTION_PATTERNS } = require("../../../utils/regex");

const handler = async ({ event, say }) => {
  try {
    const { text, channel } = event;

    if (APP_MENTION_PATTERNS.QUIEN_ES_EL_MAS_SAPO_REGEX.test(text)) {
      helper.connectRedis();

      const MORE_SAPO_KEY = `SLACK:MORE:SAPOS:${channel}`;
      const moreSapo = await helper.zRevRange({ key: MORE_SAPO_KEY });
      helper.closeRedis();

      if (moreSapo.length) {
        return await say(`El más sapo es <@${moreSapo[0]}> :sapo-perro:`);
      }

      return await say(`<!channel> Todos son sapo perros :sapo-perro: `);
    }
  } catch (error) {
    return await say(`ERROR: ${error.message}`);
  }
};

module.exports = handler;
