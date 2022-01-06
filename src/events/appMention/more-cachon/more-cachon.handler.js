const helper = require("./more-cachon.helper");

const { APP_MENTION_PATTERNS } = require("../../../utils/regex");

const handler = async ({ event, say, client: webClient }) => {
  try {
    const { text, channel } = event;

    if (APP_MENTION_PATTERNS.QUIEN_ES_EL_MAS_CACHON.test(text)) {
      helper.connectRedis();

      const MORE_CACHON_KEY = `SLACK:MORE:CACHONES:${channel}`;
      const moreCachon = await helper.zRevRange({ key: MORE_CACHON_KEY });
      helper.closeRedis();

      if (moreCachon.length) {
        return await say(`El más cachón es <@${moreCachon[0]}> :cachon:`);
      }

      return await say(`<!channel> Todos son cachones :love-cachon: `);
    }
  } catch (error) {
    return await say(`ERROR: ${error.message}`);
  }
};

module.exports = handler;
